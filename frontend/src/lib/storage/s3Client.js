import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false,
    endpoint: "https://ams3.cdn.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
        accessKeyId: 'DO00HDK8RDUKGYE6EDEH',
        secretAccessKey: 'NX5PxkdLNGqoXz0omhP0+iGF44bgfy1jXrdTejLmRIY'
    }
});

export {s3Client};