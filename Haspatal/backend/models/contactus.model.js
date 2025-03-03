// Import necessary packages
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database/db');  // Ensure the correct path to your sequelize instance
const validator = require('validator');

// Define the 'ContactUs' model
const ContactUs = sequelize.define('ContactUs', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Provide a valid email!',
            },
            notEmpty: {
                msg: 'Email is required!',
            },
        },
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10],
                msg: 'Message must contain at least 10 characters!',
            },
            notEmpty: {
                msg: 'Message is required!',
            },
        },
    },
}, {
    timestamps: true, // Enable automatic timestamps (createdAt, updatedAt)
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('ContactUs table has been successfully created, if one does not exist.');
    })
    .catch((error) => {
        console.error('Error creating the table:', error);
    });

module.exports = ContactUs;
