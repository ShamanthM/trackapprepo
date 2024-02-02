const express = require('express');
const sequelize = require('./context/sequelize-config');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const userProductAssignmentRoutes = require('./routes/userProductAssignmentRoutes');
const productAccessoryRoutes = require('./routes/productAccessoryRoutes');
const accessoryRoutes = require('./routes/accessoryRoutes');
const accessoryAssignedRoutes = require('./routes/accessoryAssignedRoutes');
const userProductAccessoryRoutes = require('./routes/userProductAccessoryRoutes');
const serviceAssignRoutes = require('./routes/serviceAssignRoutes');
const AuthenticationController = require('./controllers/AuthController');
const AuthService = require('./services/AuthService');

const app = express();  // Create an instance of the Express application

// Middleware to parse JSON requests
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Use the authentication routes from AuthenticationController
app.use(AuthenticationController);

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/userproducts', userProductAssignmentRoutes);
app.use('/productaccessories', productAccessoryRoutes);
app.use('/accessory', accessoryRoutes);
app.use('/accessoryassigned', accessoryAssignedRoutes);
app.use('/userProductAccessories', userProductAccessoryRoutes);
app.use('/serviceassignments', serviceAssignRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Sync the database and start the server
async function startServer() {
  try {
    await sequelize.sync(); // Sync database tables with Sequelize models
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

startServer();

module.exports = app;
