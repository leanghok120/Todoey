import jwt from "jsonwebtoken";
import "dotenv/config";

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (!token) return res.status(403).json("Access denied!");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Invalid token");

    req.user = user;
    next();
  });
}

export default verifyToken;
