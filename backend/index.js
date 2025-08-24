import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import countryRoutes from "./routes/countryRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/countries", countryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
