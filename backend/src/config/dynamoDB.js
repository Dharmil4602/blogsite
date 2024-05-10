import AWS from "../utils/awsConfig.js";
import dotenv from 'dotenv'

dotenv.config()
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;
