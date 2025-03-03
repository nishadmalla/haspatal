const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');  // Adjust the path to where you have your sequelize instance

// Define the Appointment model using Sequelize
const Appointment = sequelize.define('Appointment', {
    patient: {
        type: DataTypes.INTEGER,  // You can use INTEGER for ID (assuming you're using integers for ID)
        allowNull: false,
        references: {
            model: 'Users',  // Name of the User model in the database
            key: 'id',       // The primary key in the Users table
        },
    },
    patientFirstName: {
        type: DataTypes.STRING,
    },
    patientLastName: {
        type: DataTypes.STRING,
    },
    doctor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Doctors',  // Name of the Doctor model in the database
            key: 'id',         // The primary key in the Doctors table
        },
    },
    doctorFirstName: {
        type: DataTypes.STRING,
    },
    doctorLastName: {
        type: DataTypes.STRING,
    },
    experience: {
        type: DataTypes.STRING,
    },
    appointmentCharges: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Pending', 'Accepted', 'Rejected'],
        defaultValue: 'Pending',
    },
}, {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
});

module.exports = Appointment;
