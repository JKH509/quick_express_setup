const authorizeMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // Assume the user's role is included in the token and attached to req.user
    // req.user = 'admin'
    let user = {
      role: "admin"
      // role: "test"
    }
    const  {role}  = user;
    console.log("ROLE ", role)

    if (allowedRoles.includes(role)) {
      next(); // User has an allowed role, proceed to next middleware
    } else {
      res.status(403).send('Forbidden'); // User does not have an allowed role, end the request-response cycle
    }
  };
};

module.exports = authorizeMiddleware