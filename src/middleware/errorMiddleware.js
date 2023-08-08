const errorMiddleware = (err, req, res, next) => {
  console.log("A NEW ERROR WAS THROWN -> ",err);
  // Send the error message, second message and status to the client
  res.status(err.status || 500).send({ 
    message: err.message || 'Internal Server Error', 
    details: err.details 
  });
};

module.exports = errorMiddleware;