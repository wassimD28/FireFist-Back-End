// equipment.route.js
const express = require("express");
const equipmentValidation = require("../validations/equipment.validation");
const {
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getAllStandardEquipment,
  getAllCustomEquipment,
} = require("../controllers/equipment.controller");
const handleValidations = require("../middleware/handleValidations");
const multer = require("multer");
const path = require("path");

const route = express();

// Multer config for storing images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define where the images are uploaded
    cb(null, path.join(__dirname, "../uploads/images/equipment"));
  },
  filename: (req, file, cb) => {
    // Unique filename to avoid conflicts
    cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
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

// get all standard equipments
route.get("/", getAllStandardEquipment);

// get all custom equipment
route.get("/custom/:user_id", getAllCustomEquipment);

// Get a single equipment by id
route.get("/:id", getEquipmentById);

// Create a new equipment
route.post(
  "/",
  upload.single("image"),
  equipmentValidation,
  handleValidations,
  createEquipment,
);

// Update a equipment
route.put("/:id", equipmentValidation, handleValidations, updateEquipment);

// Delete a equipment
route.delete("/:id", deleteEquipment);

module.exports = route;
