// upload.route.js
const express = require("express");
const route = express();
const multer = require("multer");
const path = require("path");

const storageEquipment = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/images/equipment"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-")+ file.originalname);
  },
});
const storageExercise = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/images/exercise"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-")+ file.originalname);
  },
});

const uploadEquipment = multer({ storage: storageEquipment });
const uploadExercise = multer({ storage: storageExercise });

// Upload equipment image
route.post("/equipment", uploadEquipment.single("image"), (req, res) => {
  res.json({ message: "equipment image uploaded" });
});

// Upload exercise image
route.post("/exercise", uploadExercise.single("image"), (req, res) => {
  res.json({ message: "exercise image uploaded" });
});

module.exports = route;
