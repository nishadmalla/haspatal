const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database/db'); // Path to your Sequelize instance

// Define the 'UserCart' model
const UserCart = sequelize.define('UserCart', {
    userId: {
        type: DataTypes.INTEGER,  // Assuming 'User' has an ID of type INTEGER
        allowNull: false,
        references: {
            model: 'Users', // Refers to the 'Users' table in the database
            key: 'id',      // Foreign key refers to the 'id' column in the 'Users' table
        },
        validate: {
            notEmpty: {
                msg: 'User is required',
            },
        },
    },
    medicineId: {
        type: DataTypes.INTEGER,  // Assuming 'Medicine' has an ID of type INTEGER
        allowNull: false,
        references: {
            model: 'Medicines',  // Refers to the 'Medicines' table in the database
            key: 'id',           // Foreign key refers to the 'id' column in the 'Medicines' table
        },
        validate: {
            notEmpty: {
                msg: 'Medicine is required',
            },
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Quantity is required',
            },
            min: {
                args: [1],
                msg: 'Quantity must be at least 1',
            },
        },
    },
    totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Total Price is required',
            },
            isDecimal: {
                msg: 'Total Price must be a valid number',
            },
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Status is required',
            },
            isIn: {
                args: [['Pending', 'Completed']],
                msg: 'Status must be either Pending or Completed',
            },
        },
        defaultValue: 'Pending',
    },
}, { timestamps: true });

// Sync model with database
sequelize.sync()
    .then(() => {
        console.log('UserCart table has been successfully created, if one does not exist.');
    })
    .catch((error) => {
        console.error('Error creating the table:', error);
    });

module.exports = UserCart;
