import AWS from "../utils/awsConfig.js";
import dotenv from "dotenv";
dotenv.config();

const s3 = new AWS.S3();

const extractTextFromDocument = async (file, userId) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME_TEXT,
    Key: `${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const s3Response = await s3.upload(params).promise();
    const textractParams = {
      Document: {
        S3Object: {
          Bucket: s3Response.Bucket,
          Name: s3Response.Key,
        },
      },
      FeatureTypes: [
        "TABLES", "FORMS"
      ],
    };

    const textractResponse = await new AWS.Textract()
      .analyzeDocument(textractParams)
      .promise();

    console.log("Textract Response:", textractResponse);
    return textractResponse;
  } catch (error) {
    console.log("Error uploading file to S3:", error);
    throw error;
  }
};

export default extractTextFromDocument;
