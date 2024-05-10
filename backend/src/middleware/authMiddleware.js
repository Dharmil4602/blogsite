import jwt from "jsonwebtoken";

const tokenVerification = (req, res, next) => {
  const authToken = req.header("Authorization").split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "Access Denied" });
  }
  try {
    jwt.verify(authToken, "secretKey", (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token is invalid" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ error: "Token is invalid" });
    console.log("Token Error: ", error);
  }
};

export default tokenVerification