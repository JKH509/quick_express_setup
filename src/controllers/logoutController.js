const db = require('../models');
let User = db.User


const logoutController = () => {
 
  const handleLogout = async (req, res, next) => {
      // Extract cookies from the incoming request
      const cookies = req.cookies;

      // If there's no JWT cookie, send a 204 No Content response
      if (!cookies?.jwt) return res.sendStatus(204); //No content

      // Extract the refreshToken from the cookies
      const refreshToken = cookies.jwt;
  
      // Find the user associated with the refreshToken
      let foundUser = await User.findOne({
          where: { token: refreshToken },
      });

      // If the user with the given refreshToken is not found,
      // clear the JWT cookie and send a 204 No Content response
      if (!foundUser) {
          res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false });
          return res.sendStatus(204);
      }
  
      try {
          // If user is found, update the token in the database to an empty string, effectively logging them out
          await User.update({ token: "" }, {
              where: { id: foundUser.id }  // assuming each user has a unique identifier like 'id'
          });
      } catch (error) {
          // If there's an error while updating the user's token, pass the error to the next middleware (typically an error handler)
          next(error);
      }
  
      // Clear the JWT cookie from the response
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false });

      // Send a 204 No Content response to indicate successful logout
      res.sendStatus(204);
  }

  // Return the handleLogout function for use elsewhere
  return {
      handleLogout
  };
};


module.exports = logoutController