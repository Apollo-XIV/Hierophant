import { sveltekit } from "@sveltejs/kit/vite";
import { error } from "@sveltejs/kit"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function load() {
    await prisma.$connect();
    const res = await prisma.posts.findMany({take: 4});
    prisma.$disconnect();
    if (res.length == 0) {
        throw error(404, "Could not find any posts");
    }
    return {
        summaries: res.map((post) => ({
            slug: post.slug,
            title: post.title,
            abstract: post.abstract
        }))
    };
}


// export async function load() {
//     return {posts:[{title: "test 1", abstract: "test", author: "test", tags:["test"]},{title: "test 2", abstract: "test", author: "test", tags:["test"]},{title: "test 3", abstract: "test", author: "test", tags:["test"]}]}
// }