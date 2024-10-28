import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";

async function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith("bearer")) {
    try {
      token = authHeader.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json("Not authorized");
    }

    if (!token) {
      res.status(401).json("Not authorized");
    }
  }
}

export default protect;
