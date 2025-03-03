import asyncHandler from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";

// Middleware to authenticate dashboard users
export const isAdminAuthenticated = asyncHandler(
    async (req, res, next) => {
        const token = req.cookies.adminToken;

        if (!token) {
            throw new ApiError(401, "Unauthorized Access!");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findByPk(decoded.id);  // Sequelize equivalent to findById
        if (!req.user) {
            throw new ApiError(404, "User not found!");
        }
        if (req.user.role !== "Admin") {
            throw new ApiError(403, `${req.user.role} not authorized for this resource!`);
        }
        next();
    }
);

// Middleware to verify JWT token for patient role
export const isPatientAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.patientToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized Access!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findByPk(decoded.id);  // Sequelize equivalent to findById
    if (!req.user) {
        throw new ApiError(404, "User not found!");
    }
    if (req.user.role !== "Patient") {
        throw new ApiError(403, `${req.user.role} not authorized for this resource!`);
    }
    next();
});

// Middleware to verify JWT token for doctor role
export const isDoctorAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.doctorToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized - No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.doctor = await Doctor.findByPk(decoded.id);  // Sequelize equivalent to findById
    if (!req.doctor) {
        throw new ApiError(404, "Doctor not found!");
    }
    if (req.doctor.role !== "Doctor") {
        throw new ApiError(403, `${req.doctor.role} not authorized for this resource!`);
    }
    next();
});
