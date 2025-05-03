const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });

const internshipRoutes = require("./routes/internships");
const authRoutes = require("./routes/auth");
const companiesInfo = require("./routes/companiesInfo");
const applicationsRoutes = require("./routes/applications");
const reportRoutes = require("./routes/reports");
const inappropriateCommentsRoutes = require("./routes/comments");
const reviewsRoutes = require("./routes/reviews");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to call the backend

const PORT = 3001;

// Routes
app.use("/api/internships", internshipRoutes);
app.use("/api", authRoutes); // handles /login and /register
app.use("/api/companiesdata", companiesInfo);
app.use("/api/applications", applicationsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/inappropriateComments", inappropriateCommentsRoutes);
app.use("/api/reviews", reviewsRoutes);


const path = require("path");

// Serve React static files
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
