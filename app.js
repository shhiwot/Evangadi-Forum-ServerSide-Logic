require("dotenv").config(); // Ensure environment variables are loaded
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.Port || 5432; // Default to 5000 if PORT is not set
const authMiddleware = require("./middleware/authMiddleware");

// Database connection (imported from separate file)
const dbconnection = require("./db/dbConfig");
app.use(cors());


// User routes middleware file
const userRoutes = require("./routes/userRoutes");

// Middleware to parse JSON data
app.use(express.json());

// User routes middleware
app.use("/api/user", userRoutes);

async function start() {
  try {
    // Test database connection
    const [result] = await dbconnection.execute("SELECT 'test'");
    // Start the server and bind to 0.0.0.0
    app.listen(port, "0.0.0.0", () => {
      console.log(result);
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
}
start();

// Question routes middleware file
const questionRoutes = require("./routes/questionRoutes");
app.use("/api/question", authMiddleware, questionRoutes);

// Answer routes middleware file
const answerRoutes = require("./routes/answerRoute");
app.use("/api/answer", authMiddleware, answerRoutes);
