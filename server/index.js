const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// Connect Database
connectDB();

app.use(bodyParser.json());

app.get("/", (req, res) => 
  res.send("API is running")
);

try {
  // Listen to the port
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });

  // Define Routes

} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}