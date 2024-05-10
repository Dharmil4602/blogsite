import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByUsername } from '../../models/User.js';

export const loginUser = async (req, res) => {
  console.log("Request Body from LoginUser: ", req.body);
  const { email, password } = req.body;
  const user = await findByUsername(email);
  console.log("User from LoginUser: ", user);

  if (!user || !bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const payload = {
    username: user.username,
    userId: user.userId,
    email: user.email
  }
  jwt.sign(payload, "secretKey", (err, token) => {
    if(err) throw err
    console.log("Token from LoginUser: ", token);
    console.log("Login Successfull");
    res.json({token, email})
  })
};
