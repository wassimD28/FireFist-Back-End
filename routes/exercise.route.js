const express = require("express");
const exerciseValidation = require("../validations/exercise.validation");
const {
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  getAllExercises,
} = require("../controllers/exercise.controller");
const handleValidations = require("../middleware/handleValidations");
const multer = require("multer");

const route = express();

// Multer config for storing images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use relative path
    cb(null, 'uploads/images/exercise');
  },
  filename: (req, file, cb) => {
    // Create a more URL-friendly filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

// Check the file type and ensure it's an image
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

// get all exercises
route.get("/:id", getAllExercises);

// Get a single exercise by id
route.get("/:id", getExerciseById);

// Create a new exercise
route.post(
  "/",
  upload.single("image"),
  exerciseValidation,
  handleValidations,
  createExercise
);

// Update a exercise
route.put("/:id", exerciseValidation, handleValidations, updateExercise);

// Delete a exercise
route.delete("/:id", deleteExercise);

module.exports = route;
