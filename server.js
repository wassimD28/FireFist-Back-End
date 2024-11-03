// server.js
const express = require("express");
const path = require("path");
const { sequelize } = require('./models');
// import routes
const authRoutes = require("./routes/auth.route");
const categoryRoutes = require("./routes/category.route");
const difficultyRoutes = require("./routes/difficulty.route");
const exerciseRoutes = require("./routes/exercise.route");
const valueCounterRoutes = require("./routes/valueCounter.route");
const equipmentRoutes = require("./routes/equipment.route");
const bodyDiagramRoutes = require("./routes/bodyDiagram.route");
const uploadRoutes = require("./routes/upload.route");
const targetedMuscleRoutes = require("./routes/targetedMuscle.route");

const authenticateToken = require("./middleware/authenticateToken");
const {errorHandler , notFound} = require("./middleware/errors");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// auth route
app.use("/api/auth", authRoutes);
// routes
app.use("/api/category", authenticateToken,categoryRoutes);
app.use("/api/difficulty", authenticateToken,difficultyRoutes);
app.use("/api/valueCounter", authenticateToken,valueCounterRoutes);
app.use("/api/exercise", authenticateToken,exerciseRoutes);
app.use("/api/equipment", authenticateToken,equipmentRoutes);
app.use("/api/bodyDiagram", authenticateToken,bodyDiagramRoutes);
app.use("/api/upload", authenticateToken,uploadRoutes);
app.use("/api/targetedMuscle", authenticateToken, targetedMuscleRoutes);
// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Sync all models
sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }).catch((error) => {
    console.error("Unable to sync database:", error);
  });

module.exports = app;
