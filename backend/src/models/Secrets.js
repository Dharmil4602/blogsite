import AWS from "../utils/awsConfig.js";
import dotenv from "dotenv";
dotenv.config();

const secretManager = new AWS.SecretsManager();
const getSecretsModel = async (secretName) => {
  try {
    const secret = await secretManager
      .getSecretValue({ SecretId: secretName })
      .promise();
    console.log("Secrets from Manager:", secret);
    const secretData = JSON.parse(secret.SecretString);
    console.log("Secret Data:", secretData);
    return secretData;
  } catch (err) {
    console.error(`Error retrieving secret: ${err}`);
  }
};

const storeSecrets = async (secretName) => {
  const secretValues = {
    blogger_details: "bloggerDetails",
    blog_table: "blog",
    s3Bucket: "blog-term-images",
  };

  secretManager.putSecretValue(
    { SecretId: secretName, SecretString: JSON.stringify(secretValues) },
    (err, data) => {
      if (err) {
        console.error(`Error storing secret: ${err}`);
      } else {
        console.log("Secret stored: ", data);
        return data;
      }
    }
  );
};

export { getSecretsModel, storeSecrets };
