const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");
const User = db.User;
const Token = db.Token;

/**
 * @description Get access token by refresh token
 * @route /api/token
 * @method POST
 * @access Public
 */
const refreshToken = asyncHandler(async (req, res) => {
  const oldRefreshToken = req.body.token;

  jwt.verify(
    oldRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.status(403).send("Invalid refresh token");
      const foundUser = await User.findOne({
        where: { username: user.username },
      });
      if (foundUser == null) return res.status(403).send("User not found");
      const accessToken = generateAccessToken(foundUser);
      const refreshToken = generateRefreshToken(foundUser);
      await Token.destroy({ where: { token: oldRefreshToken } });
      await Token.create({ user_id: foundUser.id, token: refreshToken });
      res.json({ accessToken, refreshToken });
    }
  );
});

/**
 * @description Validate access token
 * @route /api/auth/validate-token
 * @method POST
 * @access Public
 */
const validateToken = asyncHandler(async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ valid: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ where: { username: decoded.username } });

    if (!user) {
      return res.status(401).json({ valid: false, message: 'Invalid token' });
    }

    res.json({ valid: true });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ valid: false, message: 'Token has expired' });
    } else {
      return res.status(401).json({ valid: false, message: 'Invalid token' });
    }
  }
});

module.exports = {
  refreshToken,
  validateToken,
};
