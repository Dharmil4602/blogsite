import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

AWS.config.update({
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "sessionToken": process.env.AWS_SESSION,
    "region": "us-east-1"
})

export default AWS