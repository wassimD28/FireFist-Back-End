const { body } = require("express-validator");
const { ValueCounter } = require("../models");

// valueCounter validations
const valueCounterValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .notEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isIn(["REPS", "DURATION", "REPS_AND_WEIGHT", "REPS_AND_DURATION", "WEIGHT_AND_DURATION"])
    .withMessage("Name must be one of the following : REPS, DURATION, REPS_AND_WEIGHT, REPS_AND_DURATION, WEIGHT_AND_DURATION")
    .bail()
    // to check that the name is unique
    .custom(async (value) => {
      const existingValueCounter = await ValueCounter.findOne({
        where: { name: value },
      });
      if (existingValueCounter) {
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

module.exports = valueCounterValidation;
