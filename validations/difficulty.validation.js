const { body } = require("express-validator");
const { Difficulty } = require("../models");

// difficulty validations
const difficultyValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .notEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage(
      "Name must be one of the following: beginner, intermediate, advanced"
    )
    .bail()
    // to check that the name is unique
    .custom(async (value) => {
      const existingDifficulty = await Difficulty.findOne({
        where: { name: value },
      });
      if (existingDifficulty) {
        throw new Error("Name already in use, name should be unique");
      }
    }),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters")
    .bail(),
  body("image")
    .optional()
    .isString()
    .withMessage("Image must be a string")
    .bail(),
];

module.exports = difficultyValidation;
