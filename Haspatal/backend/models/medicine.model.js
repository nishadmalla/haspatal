const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database/db'); // Path to your Sequelize instance

// Define the 'Medicine' model
const Medicine = sequelize.define('Medicine', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3],
                msg: 'Medicine Name must contain at least 3 characters',
            },
            notEmpty: {
                msg: 'Medicine Name is required',
            },
        },
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Price is required',
            },
            isFloat: {
                msg: 'Price must be a valid number',
            },
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10],
                msg: 'Description must contain at least 10 characters',
            },
            notEmpty: {
                msg: 'Description is required',
            },
        },
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['Tablet', 'Syrup', 'Injection', 'Drops', 'Cream', 'Powder', 'Lotion', 'Inhaler']],
                msg: 'Category must be one of the predefined options',
            },
            notEmpty: {
                msg: 'Category is required',
            },
        },
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Manufacturer is required',
            },
        },
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'Expiry Date must be a valid date',
            },
            notEmpty: {
                msg: 'Expiry Date is required',
            },
        },
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'Stock must be an integer',
            },
            notEmpty: {
                msg: 'Stock is required',
            },
        },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Image URL is required',
            },
        },
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'Discount must be an integer',
            },
            min: 0,
            notEmpty: {
                msg: 'Discount is required',
            },
        },
    }
}, { timestamps: true });

// Sync model with database
sequelize.sync()
    .then(() => {
        console.log('Medicine table has been successfully created, if one does not exist.');
    })
    .catch((error) => {
        console.error('Error creating the table:', error);
    });

module.exports = Medicine;
