const { body } = require("express-validator");
const { Muscle } = require("../models");

// muscle validations
const muscleValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .bail()
    // validate if the name exists
    .custom(async (value) => {
      const name = Muscle.findOne({ where: { name: value } });
      if (name) {
        return Promise.reject("Muscle already exists");
      }
    }),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),
  body("image")
    .optional()
    .isString()
    .withMessage("Image must be a string")
    .bail(),
];

module.exports = muscleValidation;
