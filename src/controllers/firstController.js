// error handler
// const CustomError = require('../errors/customErrors');

// import your services here
// const {authService} = require('../services/authService')

const firstController =()=> {

  const firstFunction = async (req, res, next) => {
    try { 
      res.status(200).send({ message: "Hello World!" });
    } catch (error) {
      next(new CustomError('Signup failed', 401, 'Additional signup failure information'));  // pass the error to the error handling middleware
    }
  };
  return {
    firstFunction,
  }
}

module.exports = firstController