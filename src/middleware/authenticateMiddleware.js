const authenticateMiddleware = (req, res, next) => {

  const token = req.header('Authorization');
  console.log("token ", token)

  // if (token === 'MY_SECRET_TOKEN') {
  //   // if (token === undefined) {
  //   next(); // User is authenticated, proceed to next middleware
  // } else {
  //   res.status(401).send('Not authorized'); // User is not authenticated, end the request-response cycle
  // }

  if (req.headers.authorization) {
    console.log("HEADERS ", req.headers.authorization)
    // If the request has an authorization header, continue to the next middleware or route handler
    next();
  } else {
    // If not, send a 401 Unauthorized response
    res.status(401).send('Unauthorized middleware');
  }
};

module.exports = authenticateMiddleware