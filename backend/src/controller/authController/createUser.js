import jwt from "jsonwebtoken";
import { createUserModel } from "../../models/User.js";
import subscription from "../subscriptionController/snsSubscription.js";

export const createUser = async (req, res) => {
  console.log("Request Body: ", req.body);
  const { firstName, lastName, email, username, password } = req.body;

  try {
    const user = await createUserModel(
      username,
      password,
      firstName,
      lastName,
      email
    );

    const payload = {
      userId: user.userId,
      username: user.username,
      email: user.email,
    };

    jwt.sign(payload, "secretKey", (err, token) => {
      if (err) throw err;
      console.log("Token: ", token);
      // Sending confirmation email
      res.json({ token, email });
    });

    await subscription(req, res);

    // await sendEmailController(req, res);
    // res.json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
    console.log("User Error: ", error);
  }
};