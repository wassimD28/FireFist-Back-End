const { body } = require("express-validator");

const tokenValidation = [
  body("token")
    .isString()
    .withMessage("Token must be a string")
    .bail()
    .notEmpty()
    .withMessage("Token must be a valid string")
];

module.exports = tokenValidation;
