import multer from "multer";
import path from "path";

// Define storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure the destination directory exists
        const destPath = "./public/temp";
        cb(null, destPath);
    },
    filename: function (req, file, cb) {
        // Use a unique name for the file (e.g., timestamp + original name)
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Set file filter for file type validation (e.g., allow only images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/; // Allowed file extensions
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true); // Accept the file
    } else {
        cb(new Error("Only image files are allowed!"), false); // Reject the file
    }
};

// Set file size limit (e.g., 5MB)
const limits = {
    fileSize: 5 * 1024 * 1024, // 5MB limit
};

// Initialize multer with storage, fileFilter, and limits
export const upload = multer({
    storage,
    fileFilter,
    limits,
}).single('file'); // Use .single('file') for single file upload, or .array() for multiple files
