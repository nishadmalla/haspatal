// Import necessary packages
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('./database/db');  // Path to your Sequelize instance
const validator = require('validator');

// Define the 'Doctor' model
const Doctor = sequelize.define('Doctor', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3],
                msg: 'First Name must contain at least 3 characters',
            },
            notEmpty: {
                msg: 'First Name is required',
            },
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3],
                msg: 'Last Name must contain at least 3 characters',
            },
            notEmpty: {
                msg: 'Last Name is required',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
            len: {
                args: [10, 10],
                msg: 'Phone Number must contain exactly 10 digits',
            },
            notEmpty: {
                msg: 'Phone Number is required',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8],
                msg: 'Password must contain at least 8 characters',
            },
            notEmpty: {
                msg: 'Password is required',
            },
        },
        select: false,  // Do not return password in query results
    },
    address: {
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pincode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Male', 'Female']],
            notEmpty: {
                msg: 'Gender is required',
            },
        },
    },
    department: {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    specializations: {
        type: DataTypes.JSONB, // Using JSONB for an array of specializations
        allowNull: true,
    },
    qualifications: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    availableSlots: {
        days: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        hours: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    docAvatar: {
        type: DataTypes.STRING, // Cloudinary URL
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Admin', 'Patient', 'Doctor']],
            notEmpty: {
                msg: 'Role is required',
            },
        },
    },
    languagesKnown: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    appointmentCharges: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt
});

// Hook to hash the password before saving it
Doctor.beforeSave(async (doctor, options) => {
    if (doctor.changed('password')) {
        doctor.password = await bcrypt.hash(doctor.password, 10);
    }
});

// Instance method to compare password
Doctor.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Instance method to generate JWT token
Doctor.prototype.generateJsonWebToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// Sync model with the database
sequelize.sync()
    .then(() => {
        console.log('Doctor table has been successfully created, if one does not exist.');
    })
    .catch((error) => {
        console.error('Error creating the table:', error);
    });

module.exports = Doctor;
