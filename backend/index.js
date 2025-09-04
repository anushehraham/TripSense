import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import countryRoutes from "./routes/countryRoutes.js";
import attractionsRoutes from "./routes/attractionsRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import localPhraseRoutes from "./routes/localPhraseRoutes.js";
import bestTimeRoutes from "./routes/bestTimeRoutes.js";
import cultureRoutes from "./routes/cultureRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";
import packlistRoutes from "./routes/packlistRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

// ✅ Add cache-busting headers for images
app.use((req, res, next) => {
  if (req.path.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  next();
});

// ✅ Serve static files (images) from uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/countries", countryRoutes);
app.use("/api/attractions", attractionsRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/localphrase", localPhraseRoutes);
app.use("/api/besttime", bestTimeRoutes);
app.use("/api/culture", cultureRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/packlist", packlistRoutes);
app.use("/api/emergency", emergencyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
