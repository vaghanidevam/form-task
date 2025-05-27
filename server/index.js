const express = require("express");
const app = express();
const formRoutes = require("./Form/formRoutes");
const database = require("./config/database");
const cors = require("cors");


app.use(cors());


// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
database.connect();

// Routes
app.use("/api/forms", formRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server started at http://localhost:3000");
});
