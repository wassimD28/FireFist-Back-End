const { body } = require("express-validator");
const {
  User,
  Difficulty,
  Category,
  ValueCounter,
  Equipment,
  Muscle,
} = require("../models");
const ensureArray = require("../utils/ensureArray");
const ALLOWED_PRESSURE_LEVELS = ["low","medium","high","very high"];

// exercise validations
const exerciseValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Name must not exceed 255 characters")
    .bail(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  body("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .bail()
    .isInt()
    .withMessage("User ID must be a number")
    .bail()
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("User ID does not exist");
      }
      return true;
    })
    .bail(),

  body("difficulty_id")
    .notEmpty()
    .withMessage("Difficulty ID is required")
    .bail()
    .isInt()
    .withMessage("Difficulty ID must be a number")
    .bail()
    .custom(async (value) => {
      const difficulty = await Difficulty.findByPk(value);
      if (!difficulty) {
        throw new Error("Difficulty ID does not exist");
      }
      return true;
    })
    .bail(),

  body("category_id")
    .notEmpty()
    .withMessage("Category ID is required")
    .bail()
    .isInt()
    .withMessage("Category ID must be a number")
    .bail()
    .custom(async (value) => {
      const category = await Category.findByPk(value);
      if (!category) {
        throw new Error("Category ID does not exist");
      }
      return true;
    })
    .bail(),

  body("valueCounter_id")
    .notEmpty()
    .withMessage("Value Counter ID is required")
    .bail()
    .isInt()
    .withMessage("Value Counter ID must be a number")
    .bail()
    .custom(async (value) => {
      const valueCounter = await ValueCounter.findByPk(value);
      if (!valueCounter) {
        throw new Error("Value Counter ID does not exist");
      }
      return true;
    })
    .bail(),

  body("targetedMuscle")
    .customSanitizer(ensureArray)
    .isArray()
    .withMessage("Targeted Muscles must be an array")
    .bail()
    .custom(async (value) => {
      if (!value.length) {
        throw new Error("At least one Targeted Muscle ID is required");
      }
      for (const targetedMuscle of value) {
        // decode json value
        const decodeTargetedMuscle = JSON.parse(targetedMuscle)
        const muscleExist = await Muscle.findByPk(decodeTargetedMuscle.muscle_id);
        if (!muscleExist) {
          throw new Error(
            `There is no such muscle with id = ${decodeTargetedMuscle.muscle_id}.`
          );
        }
        // Validate pressure level
        if (!ALLOWED_PRESSURE_LEVELS.includes(decodeTargetedMuscle.pressureLevel)) {
          throw new Error(
            `Pressure level should be one of these values ${JSON.stringify(ALLOWED_PRESSURE_LEVELS)}, "${decodeTargetedMuscle.pressureLevel}" is not allowed.`
          );
        }
      }
      return true;
    })
    .bail(),

  body("equipment_id")
    .customSanitizer(ensureArray)
    .isArray()
    .withMessage("Equipment IDs must be an array")
    .bail()
    .custom(async (value) => {
      if (!value.length) {
        throw new Error("At least one Equipment ID is required");
      }
      for (const id of value) {
        const equipment = await Equipment.findByPk(id);
        if (!equipment) {
          throw new Error(`Equipment ID ${id} does not exist`);
        }
      }
      return true;
    })
    .bail(),

  body("image").custom((value, { req }) => {
    if (!req.file) {
      // If you want to make image required, uncomment the next line
      // throw new Error("Image is required");
      return true;
    }
    // Add any specific image validation here if needed
    return true;
  }),
];

module.exports = exerciseValidation;
