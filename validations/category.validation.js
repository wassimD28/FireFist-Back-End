const { body } = require("express-validator");
const { Category } = require("../models");

// category validations
const categoryValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .bail()
    .isIn(["cardio", "strength", "flexibility"])
    .withMessage(
      "Name must be one of the following: cardio, strength, flexibility"
    )
    .bail()
    // to check that the name is unique
    .custom(async (value) => {
      const existingCategory = await Category.findOne({
        where: { name: value },
      });
      if (existingCategory) {
        throw new Error("Name already in use, name should be unique");
      }
    }),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),
  body("image").optional().isString().withMessage("Image must be a string"),
];

module.exports = categoryValidation;
