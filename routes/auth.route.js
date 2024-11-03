const express = require("express");

// validations 
const registerValidation = require("../validations/register.validation");
const loginValidation = require("../validations/login.validation");
const refreshTokenValidation = require("../validations/refreshToken.validation");
const tokenValidation = require("../validations/token.validation");

// controllers
const logout = require("../controllers/logout.controller");
const register = require("../controllers/register.controller");
const login = require("../controllers/login.controller");
const { refreshToken , validateToken} = require("../controllers/token.controller");

// middleware
const handleValidations = require("../middleware/handleValidations");
require("dotenv").config();

const route = express();

// register
route.post("/register", registerValidation, handleValidations, register);

// login
route.post("/login", loginValidation, handleValidations, login);

// refresh token
route.post("/token", refreshTokenValidation, handleValidations, refreshToken);

// validate token
route.post("/validate-token",tokenValidation, handleValidations, validateToken);

// logout
route.delete("/logout", tokenValidation, handleValidations, logout);

module.exports = route;
