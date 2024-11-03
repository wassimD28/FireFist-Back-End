const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  const payload = { id: user.id, email: user.email, username: user.username, roles: user.roles };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2h",
  });
}
function generateRefreshToken(user) {
    const payload = { username: user.username };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d"
    });
  }

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
