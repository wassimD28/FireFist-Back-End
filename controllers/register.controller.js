const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.User;

/**
 * @description user register
 * @route /api/register
 * @method POST
 * @access public
 */

const register = asyncHandler(async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User registered successfully",
    });
  });

  module.exports = register;

