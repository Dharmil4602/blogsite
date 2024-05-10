import AWS from "../utils/awsConfig.js";

const sns = new AWS.SNS();
const sendEmailToSubscriber = async (email) => {
  const messageAttributes = {
    email: {
      DataType: "String",
      StringValue: email,
    },
  };
  const params = {
    Message: "Blog has been posted Successfully",
    Subject: "Blog Post Confirmation",
    TopicArn: "arn:aws:sns:us-east-1:730335407978:BlogSubscription",
    MessageAttributes: messageAttributes,
  };

  try {
    const result = await sns.publish(params).promise();
    console.log("Message Sent From Model", result);
    console.log("Message ID: ", result.MessageId);
    return result;
  } catch (error) {
    console.error("Error Sending Email: ", error);
    throw error;
  }
};

const sendConfirmationEmail = async (email, token) => {
// const confirmatinLink = `https://sns.us-east-1.amazonaws.com/confirmation.html?TopicArn=arn:aws:sns:us-east-1:730335407978:BlogSubscription&Token=${token}`
// console.log("Confirmation Link: ", confirmatinLink);
const message = `Please click on the link to confirm your account:`
const params = {
    Message: message,
    Subject: "Confirm Your Email",
    TopicArn: "arn:aws:sns:us-east-1:730335407978:BlogSubscription",
    };

    try {
        const result = await sns.publish(params).promise();
        console.log("Confirmation Sent From Model", result);
        return result;
    } catch (error) {
        console.error("Error Sending Confirmation Email: ", error);
        throw error;
    }
}


export {sendEmailToSubscriber, sendConfirmationEmail};
