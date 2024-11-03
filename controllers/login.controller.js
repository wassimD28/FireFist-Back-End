const asyncHandler = require("express-async-handler");
const db = require("../models");
const User = db.User;
const Token = db.Token;
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");

/**
 * @description user login
 * @route /api/login
 * @method POST
 * @access public
 */

const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (isMatch) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await Token.create({
      user_id: user.id,
      token: refreshToken,
    });
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken , user_id: user.id });
  } else {
    res.status(400).json({ message: "Incorrect email or password." });
  }
});

module.exports = login;
