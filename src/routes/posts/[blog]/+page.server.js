import { sveltekit } from "@sveltejs/kit/vite";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const load = async ({fetch, params}) => {
    await prisma.$connect();
    const res = await prisma.posts.findUnique({where: {slug: params.blog},});
    prisma.$disconnect();
    let content = await fetch(res.url);
    content = await content.text();
    return {content};
}
