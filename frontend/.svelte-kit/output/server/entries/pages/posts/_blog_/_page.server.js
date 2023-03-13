import "../../../../chunks/index3.js";
import { e as error } from "../../../../chunks/exports.js";
import { PrismaClient } from "@prisma/client";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
const s3Client = new S3({
  forcePathStyle: false,
  endpoint: "https://ams3.cdn.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_ID,
    secretAccessKey: process.env.S3_ACCESS_KEY
  }
});
const prisma = new PrismaClient();
const load = async ({ fetch, params }) => {
  await prisma.$connect();
  const res = await prisma.posts.findUnique({ where: { slug: params.blog } });
  prisma.$disconnect();
  if (!res) {
    throw error(404, "Could not find this post");
  }
  const command = new GetObjectCommand({
    Bucket: "hierophant",
    Key: res.url
  });
  let content;
  try {
    const response = await s3Client.send(command);
    content = await response.Body.transformToString();
  } catch (err) {
    console.error(err);
    throw error(500, "Could not find post content");
  }
  return { content };
};
export {
  load
};
