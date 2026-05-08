const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-vercel-app.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/tasks", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});