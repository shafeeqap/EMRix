import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    return next(new Error("Unauthorized"));
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401);
    return next(new Error("Invalid or expired token"));
  }
};
