import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false,
    endpoint: "https://ams3.cdn.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_ID,
        secretAccessKey: process.env.S3_ACCESS_KEY
    }
});

export {s3Client};