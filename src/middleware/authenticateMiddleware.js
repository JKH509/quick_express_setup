const authenticateMiddleware = (req, res, next) => {

  const token = req.header('Authorization');
  console.log("token ", token)

  if (token === 'MY_SECRET_TOKEN') {
    // if (token === undefined) {
    next(); // User is authenticated, proceed to next middleware
  } else {
    res.status(401).send('Not authorized'); // User is not authenticated, end the request-response cycle
  }
};

module.exports = authenticateMiddleware