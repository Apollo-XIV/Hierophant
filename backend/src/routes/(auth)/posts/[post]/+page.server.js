import { sveltekit } from "@sveltejs/kit/vite";
import { error } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "$lib/storage/s3Client";

const prisma = new PrismaClient();

export const load = async ({fetch, params}) => {
    // Connect to ORM & DB
    await prisma.$connect();
    const res = await prisma.posts.findUnique({where: {slug: params.post},});
    prisma.$disconnect();
    // Throw error if page not found
    if (!res) {
        throw error(404, "Could not find this post")
    }
    console.log(res.url);
    console.log(process.env.S3_ACCESS_KEY);
    // Config CDN Req.
    const command = new GetObjectCommand({
        Bucket: "hierophant",
        Key: res.url
    })
    // Run CDN Req.
    let content
    try {
        const response = await s3Client.send(command);
        content = await response.Body.transformToString();
    } catch (err) {
        console.error(err);
        throw error(500, "Could not find post content")
    }
    return {content, res};
}

export const actions = {
    update: async ({request}) => {
        console.log("success")
        let data = Object.fromEntries(await request.formData())
        console.log(data.slug, data.title, data.abstract, data.content)
        prisma.$connect();
        const res = await prisma.posts.update({
            where: {id: data.id},
            data: {
                title: data.title,
                slug: data.slug,
                abstract: data.abstract
            }
        })
        prisma.$disconnect();
        console.log(res)
        return {
            success: true
        }
    }

}
