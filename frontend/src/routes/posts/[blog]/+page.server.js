import { sveltekit } from "@sveltejs/kit/vite";
import { error } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const load = async ({fetch, params}) => {
    await prisma.$connect();
    const res = await prisma.posts.findUnique({where: {slug: params.blog},});
    prisma.$disconnect();
    if (!res) {
        throw error(404, "Could not find this post")
    }
    let content = await fetch(res.url);
    content = await content.text();
    return {content};
}
