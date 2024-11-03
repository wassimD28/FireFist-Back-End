const { body } = require("express-validator");
const db = require("../models");
const Token = db.Token;

const refreshTokenValidation = [
  body("token")
    .isString()
    .withMessage("Token must be a string")
    .bail()
    .notEmpty()
    .withMessage("Token must be a valid string")
    .bail()
    .custom(async (value) => {
        const user = await Token.findOne({ where: { token:value } });
        if (!user) {
          return Promise.reject("Token is invalid or expired");
        }
      })
];

module.exports = refreshTokenValidation;
