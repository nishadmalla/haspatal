const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database/db'); // Path to your Sequelize instance

// Define the 'Testimonial' model
const Testimonial = sequelize.define('Testimonial', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Full Name is required',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Email is invalid',
            },
            notEmpty: {
                msg: 'Email is required',
            },
        },
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Country is required',
            },
        },
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'State is required',
            },
        },
    },
    review: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'Review is optional',
            },
        },
    },
    testimonialImg: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'Testimonial image is optional',
            },
        },
    },
}, { timestamps: true });

// Sync model with database
sequelize.sync()
    .then(() => {
        console.log('Testimonial table has been successfully created, if one does not exist.');
    })
    .catch((error) => {
        console.error('Error creating the table:', error);
    });

module.exports = Testimonial;
