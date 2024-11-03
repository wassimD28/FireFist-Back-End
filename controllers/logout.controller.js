const asyncHandler = require("express-async-handler");
const db = require("../models");
const Token = db.Token;

/**
 * @description logout
 * @route /api/logout
 * @method DELETE
 * @access public
 */
const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.body.token;
  const token = await Token.destroy({ where: { token: refreshToken } });
  if (token == 0) return res.status(404).json({ message:"Token not found"});
  res.json({ message : "Logged out successfully"});
});

module.exports = logout;
