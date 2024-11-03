// Middleware for checking admin role
function checkAdminRole(req, res, next) {
  if (req.user && req.user.roles && req.user.roles.includes("ROLE_ADMIN")) {
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = checkAdminRole;
