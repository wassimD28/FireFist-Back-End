// equipment.validation.js
const { body } = require("express-validator");
const { Equipment, User } = require("../models");

// equipment validations
const equipmentValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .notEmpty()
    .withMessage("Name must not be empty")
    .bail()
    // to check that the name is unique
    .custom(async (value) => {
      const existingEquipment = await Equipment.findOne({
        where: { name: value },
      });
      if (existingEquipment) {
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
  body("user_id")
    .isNumeric()
    .withMessage("User ID must be a number")
    .bail()
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("User ID does not exist");
      }
    }),
];

module.exports = equipmentValidation;
