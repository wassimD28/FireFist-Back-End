const { body } = require("express-validator");
const db = require("../models");
const User = db.User;

const registerValidation = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .bail()
    .custom(async (value) => {
      // check if the username is not already taken
      const existingUser = await User.findOne({ where: { username: value } });
      if (existingUser) {
        return Promise.reject("Username already exists");
      }
    })
    .bail(),
  body("email").isEmail().withMessage("please enter a valid email").bail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .bail()
    .custom((value) => {
      // check if the password is a strong one
      if (!/(?=(?:.*[a-z]){2})/.test(value)) {
        return Promise.reject(
          "Password must contain at least two lowercase letters"
        );
      }
      if (!/(?=(?:.*[A-Z]){2})/.test(value)) {
        return Promise.reject(
          "Password must contain at least two uppercase letters"
        );
      }
      if (!/(?=(?:.*\d){2})/.test(value)) {
        return Promise.reject("Password must contain at least two numbers");
      }
      if (!/(?=(?:.*[@$!%*?#&^]){2})/.test(value)) {
        return Promise.reject(
          "Password must contain at least two special characters"
        )
      }
      return true;
    }),
];

module.exports = registerValidation;
