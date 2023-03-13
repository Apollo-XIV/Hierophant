import "../../../chunks/index3.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function load() {
  await prisma.$connect();
  const res = await prisma.posts.findMany();
  prisma.$disconnect();
  if (!res) {
    return error(404, "Could not find any posts");
  }
  return {
    summaries: res.map((post) => ({
      slug: post.slug,
      title: post.title,
      abstract: post.abstract
    }))
  };
}
export {
  load
};
