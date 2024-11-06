const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");

// Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const brandRouter = require("./routes/brandRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const OrderRouter = require("./routes/orderRoutes");
const searchRouter = require("./routes/searchRoute");

// error handler
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

// Load environment variables
dotenv.config();

const app = express();

// Connect Database
connectDB();

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => 
  res.status(200).json({ message: "API is running..." })
);

try {
  // Listen to the port
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  });

  // Define Routes
  app.use("/api/products", productRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/users", userRouter);
  app.use("/api/reviews", reviewRouter);
  app.use("/api/orders", OrderRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/search", searchRouter);

  // Error handler
  app.use(notFound);
  app.use(errorHandler);

} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}