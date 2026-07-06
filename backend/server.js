const express = require("express");
require("dotenv").config();

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authroute");
const studentRoutes = require("./routes/studentroute");
const attendanceRoutes = require("./routes/attendanceroute");
const dashboardRoutes = require("./routes/dashboardroute");
const pdfRoutes = require("./routes/pdfroute");

const app = express();

/* ===========================
   Security Middleware
=========================== */

app.use(helmet());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===========================
   Rate Limiter
=========================== */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3, // Only for testing
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
});

app.use("/api", limiter);

/* ===========================
   Routes
=========================== */

app.use("/api", authRoutes);
app.use("/api", studentRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", pdfRoutes);

/* ===========================
   Default Route
=========================== */

app.get("/", (req, res) => {
  res.send("🚀 Smart Campus Attendance Management API is Running...");
});

/* ===========================
   Server
=========================== */

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});