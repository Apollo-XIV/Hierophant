
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./src/lib/storage/s3Client.js";

const run = async () => {

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