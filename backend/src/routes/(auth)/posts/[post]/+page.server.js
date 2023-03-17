import { sveltekit } from "@sveltejs/kit/vite";
import { error, redirect } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";
import { fetchObject, uploadObject, deleteObject } from "$lib/modules/storage/storage.js";

const prisma = new PrismaClient();

export const load = async ({fetch, params}) => {
    let content;
    if (params.post === "new") {
        const res = {
            id: "new",
            title: "",
            abstract: "",
            slug: "",
            url :""
        };
        return({content, res})
    }

    // Connect to ORM & DB
    await prisma.$connect();
    const res = await prisma.posts.findUnique({where: {slug: params.post},});
    prisma.$disconnect();
    // Throw error if page not found
    if (!res) {
        throw error(404, "Could not find this post")
    }
    const getparams = {
        Bucket: "hierophant",
        Key: res.url
    };

    content = fetchObject(getparams);

    return {content, res};
}

export const actions = {
    update: async ({request}) => {
        let data = Object.fromEntries(await request.formData())
        prisma.$connect();

        if (data.id === "new") {            
            const res = await prisma.posts.create({
                data: {
                    title: data.title,
                    slug: data.slug,
                    abstract: data.abstract,
                    url: `posts/${data.slug}`
                }
            })
            prisma.$disconnect();
            const params = {
                Bucket: "hierophant",
                Key: `posts/${data.slug}`,
                Body: data.content,
                ACL: "public-read",
                Metadata: {"Content-type": "text/html"}
            };

            let response = await uploadObject(params);
            
            console.log(response);
            
            throw redirect(303, ("/posts/"+data.slug))
        }
        
        
        const oid = (await prisma.posts.findUnique({where: { id: data.id }})).url;
        console.log("oid: "+ oid);
        
        
        
        const res = await prisma.posts.update({
            where: {id: data.id},
            data: {
                title: data.title,
                slug: data.slug,
                abstract: data.abstract,
                url: `posts/${data.slug}`
            }
        })
        prisma.$disconnect();
        const params = {
            Bucket: "hierophant",
            Key: `posts/${data.slug}`,
            Body: data.content,
            ACL: "public-read",
            Metadata: {"Content-type": "text/html"}
        };

        if (oid != data.url) {
            let response = await deleteObject({Bucket: "hierophant", Key: oid});
            console.log(response);
        }
        let response = await uploadObject(params);
        
        console.log(response);
        
        throw redirect(303, ("/posts/"+data.slug))

    }

}
