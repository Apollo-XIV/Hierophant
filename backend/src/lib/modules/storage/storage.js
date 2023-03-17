import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false,
    endpoint: "https://ams3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_ID,
        secretAccessKey: process.env.S3_ACCESS_KEY
    }
});

// Fetches data from an S3 bucket
const fetchObject = async (params) => {
    /*
    PARAMS STRUCTURE:
    const params = {
        Bucket: "hierophant",
        Key: "posts/FILENAME.EXT"
    };
    */

    try {
        const data = await s3Client.send(new GetObjectCommand(params));
        let content = await data.Body.transformToString();
        return content;
    } catch (err) {
        console.log("Error", err);
    }
}

const deleteObject = async (params) => {
        /*
    PARAMS STRUCTURE:
    const params = {
        Bucket: "hierophant",
        Key: "posts/FILENAME.EXT"
    };
    */

    try {
        const data = await s3Client.send(new DeleteObjectCommand(params));
        return data;
    } catch (err) {
        console.log("Error", err);
    }
}

// Uploads an object to an S3 bucket
const uploadObject = async (params) => {
    /*
    PARAMS STRUCTURE:
    const params = {
        Bucket: "hierophant",
        Key: "posts/FILENAME.EXT",
        Body: OBJECT,
        ACL: "private",
        Metadata: {any meta data K-V pairs}
    };
    */

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log("Successfully uploaded object:" + params.Bucket +"/" + params.Key);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};


export {s3Client, uploadObject, fetchObject, deleteObject};