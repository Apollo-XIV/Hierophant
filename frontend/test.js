
import { GetObjectCommand } from "@aws-sdk/client-s3";
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

const run = async () => {
    console.log(process.env.S3_ACCESS_ID)
    const command = new GetObjectCommand({
        Bucket: "hierophant",
        Key: 'posts/demoblog.md'
    })
    let content
    try {
        const response = await s3Client.send(command);
        content = await response.Body.transformToString();
        console.log(content);
    } catch (err) {
        console.error(err);
    }
    return {content};
}

run()