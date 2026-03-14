import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { doctorRoutes } from "./routes/doctorRoutes.js";
import { appointmentRoutes } from "./routes/appointmentRoutes.js";
import { patientRoutes } from "./routes/patientRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/patient", patientRoutes);

app.listen(PORT, () => [
  console.log(`Server is running on port http://localhost:${PORT}`),
]);
