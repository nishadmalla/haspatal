const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database/db'); // Path to your Sequelize instance
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the 'User' model
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'First Name is required',
            },
            len: {
                args: [3],
                msg: 'First Name must contain at least 3 characters',
            },
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Last Name is required',
            },
            len: {
                args: [3],
                msg: 'Last Name must contain at least 3 characters',
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
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Phone number is required',
            },
            len: {
                args: [10, 10],
                msg: 'Phone number must contain exactly 10 digits',
            },
        },
    },
    address: {
        type: DataTypes.JSONB,  // Storing address as JSON object (city, country)
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Password is required',
            },
            len: {
                args: [8, 255],
                msg: 'Password must contain at least 8 characters',
            },
        },
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'DOB is required',
            },
        },
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Gender is required',
            },
            isIn: {
                args: [['Male', 'Female']],
                msg: 'Gender must be Male or Female',
            },
        },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Role is required',
            },
            isIn: {
                args: [['Admin', 'Patient', 'Doctor']],
                msg: 'Role must be Admin, Patient, or Doctor',
            },
        },
    },
}, { timestamps: true });

// Hash the password before saving
User.beforeSave(async (user, options) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

// Compare password
User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate JWT
User.prototype.generateJsonWebToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// Sync model with database
sequelize.sync()
    .then(() => {
        console.log('User table has been successfully created, if one does not exist.');
    })
    .catch((error) => {
        console.error('Error creating the table:', error);
    });

module.exports = User;
