const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");

// Routes
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const brandRouter = require("./routes/brandRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const cartRouter = require("./routes/cartRoutes");
const OrderRouter = require("./routes/orderRoutes");

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
  app.use("/products", productRouter);
  app.use("/categories", categoryRouter);
  app.use("/brands", brandRouter);
  app.use("/users", userRouter);
  app.use("/reviews", reviewRouter);
  app.use("/cart", cartRouter);
  app.use("/orders", OrderRouter);

  // Error handler
  app.use(notFound);
  app.use(errorHandler);

} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}