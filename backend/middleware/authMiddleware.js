import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.JWT_ACCESS_SECRET, 'process.env.JWT_ACCESS_SECRET');


export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(token, 'token');
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    // console.log(token, 'token');
    

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // console.log(decoded, 'decoded');
    
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
