const { body } = require("express-validator");
const db = require("../models");
const User = db.User;

const loginValidation = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .custom(async (value) => {
      const username = await User.findOne({ where: { username: value } });
      if (!username) {
        return Promise.reject("This username does not exist");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

module.exports = loginValidation;
