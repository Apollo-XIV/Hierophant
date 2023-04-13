import { sveltekit } from "@sveltejs/kit/vite";
import { error } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";
import { fetchObject } from "$lib/modules/storage/storage.js";

const prisma = new PrismaClient();

export const load = async ({fetch, params}) => {
    // Connect to ORM & DB
    await prisma.$connect();
    const res = await prisma.posts.findUnique({where: {slug: params.blog},});
    prisma.$disconnect();
    // Throw error if page not found
    if (!res) {
        throw error(404, "Could not find this post")
    }
    console.log("found the post and url")
    // Config CDN Req.
    const getparams = {
        Bucket: "hierophant-1",
        Key: res.url
    };
    // Run CDN Req.
    let content
    try {
        console.log("asfg")
        content = fetchObject(getparams)
        console.log("asdf")
    } catch (err) {
        console.log(err)
        console.error(err);
        throw error(500, "Could not find post content")
    }

    return {content, res};
}
