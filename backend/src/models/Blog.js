import dynamoDB from "../config/dynamoDB.js";
import { v4 as uudiv4 } from "uuid";
import AWS from "../utils/awsConfig.js";
import { SubscribeCommand } from "@aws-sdk/client-sns";
import { SNSClient } from "@aws-sdk/client-sns";
import dotenv from "dotenv";
import { getSecretsModel } from "./Secrets.js";
dotenv.config();
const s3 = new AWS.S3();
const sns = new AWS.SNS();
const snsClient = new SNSClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION, // Optional
  },
  region: "us-east-1",
});

const createBlogModel = async (title, author, content, userId, imageUrl) => {
  const postId = uudiv4();
  const blog = {
    title,
    author,
    content,
    postId,
    imageUrl,
    createdAt: new Date().toISOString(),
    userId,
  };

  try {
    const secrets = await getSecretsModel("blogSecretManager");
    console.log("Secrets from Manager:", secrets);
    const tableName = await secrets.blog_table;
    console.log("Table Name:", tableName);
    const result = await dynamoDB
      .put({
        // TableName: process.env.DYNAMODB_TABLE_NAME_POST,
        TableName: tableName,
        Item: blog,
      })
      .promise();
    console.log("DynamoDB Response:", result);
    return blog;
  } catch (error) {
    console.error("DynamoDB Error:", error);
    throw error;
  }
};

const getAllBlogsModel = async (userId) => {
  const secrets = await getSecretsModel("blogSecretManager");
  console.log("Secrets from Manager:", secrets);
  const tableName = await secrets.blog_table;
  console.log("Table Name:", tableName);
  try {
    const result = await dynamoDB
      .query({
        // TableName: process.env.DYNAMODB_TABLE_NAME_POST,
        TableName: tableName,
        IndexName: "userId-index",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
      .promise();

    console.log("Result from DynamoDB:", result.Items);
    return result.Items;
  } catch (error) {
    console.error("Error retrieving blog posts for user:", error);
    throw error;
  }
};

const getBlogByIdModel = async (postId) => {
  const secrets = await getSecretsModel("blogSecretManager");
  console.log("Secrets from Manager:", secrets);
  const tableName = await secrets.blog_table;
  console.log("Table Name:", tableName);
  const result = await dynamoDB
    .get({
      // TableName: process.env.DYNAMODB_TABLE_NAME_POST,
      TableName: tableName,
      Key: { postId },
    })
    .promise();

  return result.Item;
};

const getBlogsForUser = async () => {
  const secrets = await getSecretsModel("blogSecretManager");
  console.log("Secrets from Manager:", secrets);
  const tableName = await secrets.blog_table;
  console.log("Table Name:", tableName);
  try {
    const result = await dynamoDB
      .scan({
        // TableName: process.env.DYNAMODB_TABLE_NAME_POST,
        TableName: tableName,
      })
      .promise();

    console.log("Result from DynamoDB for all:", result.Items);
    return result.Items;
  } catch (error) {
    console.error("Error retrieving all blogs:", error);
    throw error;
  }
};

const uploadImageToS3 = async (file, userId, secretName) => {
  const secret = await getSecretsModel(secretName)
  console.log("Secrets from Manager for S3:", secret);
  const bucketName = await secret.s3Bucket;
  const params = {
    // Bucket: "blog-term-images",
    // Bucket: process.env.S3_BUCKET_NAME,
    Bucket: bucketName,
    Key: `${userId}/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: "public-read",
  };

  try {
    const response = await s3.upload(params).promise();
    // returning cloudfront url
    const imageUrl = `https://d32hz4rw8jtjuh.cloudfront.net/${userId}/${file.originalname}`;
    console.log("CloudFront Image URL: ", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};

const sendSubscriptionEmail = async (email) => {

  const params = {
    Message: `Click on the link to confirm your account:`,
    Subject: "Confirm Your Email",
    TopicArn: "arn:aws:sns:us-east-1:730335407978:BlogSubscription",
  };

  try {
    const result = await snsClient.send(
      new SubscribeCommand({
        Protocol: "email",
        Endpoint: email,
        TopicArn: params.TopicArn,
      })
    );
    console.log("SNS Response:", result);
    return result;
  } catch (error) {
    console.error("SNS Error:", error);
    throw error;
  }
};

export {
  createBlogModel,
  getAllBlogsModel,
  getBlogByIdModel,
  uploadImageToS3,
  sendSubscriptionEmail,
  getBlogsForUser
};
