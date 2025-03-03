// Import required packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');  // Adjust the path based on your project structure

// Initialize the app
const app = express();

// Set the port
const PORT = process.env.PORT || 5469;  // Defaulting to 5469, you can set to 5432 or any port you prefer

// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data

// Test DB connection on server start
sequelize.authenticate()
    .then(() => {
        console.log('DB Connection successful..........');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// Define a simple route (Optional)
app.get('/', (req, res) => {
    res.send('Welcome to the Hospital Appointment System API');
});

// Running the server on the specified PORT
app.listen(PORT, () => {
    console.log(`Server Running on.......................... PORT ${PORT}`);
});
