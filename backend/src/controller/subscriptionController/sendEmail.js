import {sendEmailToSubscriber} from "../../models/SendEmailModel.js";

const sendEmailController = async (req, res) => {
  const email = req.body.email;
    console.log("sendEmailControllerEmail: ", email);
  try {
    const response = await sendEmailToSubscriber(email);
    console.log("Email sent successfully: ", response);
    res.status(200).json(response);
    // res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
};

export default sendEmailController;