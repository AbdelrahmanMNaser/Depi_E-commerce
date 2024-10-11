const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');  // Import the connectDB function
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const { customer, vendor } = require('./middleware/role');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Protected routes
app.get('/customer-dashboard', auth, customer, (req, res) => {
  res.send('Welcome to the Customer Dashboard');
});

app.get('/vendor-dashboard', auth, vendor, (req, res) => {
  res.send('Welcome to the Vendor Dashboard');
});

// Static files for HTML views
app.use('/views', express.static('views'));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error(`Unhandled Rejection: ${error.message}`);
  app.close(() => process.exit(1)); // Exit process with failure
});
