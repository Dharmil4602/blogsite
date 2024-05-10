import dynamoDB from "../config/dynamoDB.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { getSecretsModel } from "./Secrets.js";

const createUserModel = async (
  username,
  password,
  firstName,
  lastName,
  email
) => {
  const userId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
    userId,
  };

  try {
    await dynamoDB
      .put({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: user,
      })
      .promise();
    return user;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

const findByUsername = async (email) => {
  console.log("Finding user by email:", email);
  // const result = await dynamoDB
  //   .get({
  //     TableName: process.env.DYNAMODB_TABLE_NAME,
  //     Key: { userId },
  //   })

  const result = await dynamoDB
    .query({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    })
    .promise();
  console.log("User found:", result.Items[0]);
  return result.Items[0];
};

const getBloggerDetails = async () => {
  const secrets = await getSecretsModel("blogSecretManager");
  const tableName = await secrets.blogger_details
  try {
    const result = await dynamoDB
      .scan({
        TableName: tableName,
      })
      .promise();
    return result.Items;
  } catch (error) {
    console.error("Error retrieving blogger details:", error);
    throw error;
  }
}

export { createUserModel, findByUsername, getBloggerDetails };
