const db = require('../models');
let User = db.User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();





// const handleLogin = async (req, res) => {
//   const { username, pwd } = req.body;

//   if (!username || !pwd) 
//       return res.status(400).json({ 'message': 'Username and password are required.' });

//   // Find user
//   const foundUser = await User.findOne({
//       where: {
//           user_name: username
//       }
//   });

//   if (!foundUser) 
//       return res.sendStatus(401); // Unauthorized 

//   // Compare password
//   const match = await bcrypt.compare(pwd, foundUser.password);

//   if (match) {
//       // Create JWTs
//       const accessToken = jwt.sign(
//           { "username": foundUser.username },
//           process.env.ACCESS_TOKEN_SECRET,
//           { expiresIn: '30s' }
//       );
//       const refreshToken = jwt.sign(
//           { "username": foundUser.username },
//           process.env.REFRESH_TOKEN_SECRET,
//           { expiresIn: '1d' }
//       );

//       // Update foundUser's refreshToken in the database
//       await foundUser.update({ refreshToken });

//       // E.g., send JWT in response or set it in a cookie
//       res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 })
//       res.json({ accessToken });

//   } else {
//       res.sendStatus(401);
//   }
// }

const authController =()=>{

    const handleLogin = async (req, res, next) => {
        const { username, pwd } = req.body;
        console.log("EMAIL ", username, pwd)
    
        try {
            // Extracting the email and password from the request body
            
    
            // Searching for a user with the provided email in the database
            let foundUser = await User.findOne({
                where: { user_name: username },
                // These commented attributes lines are examples of how you can 
                // selectively return or exclude specific fields from the query.
                // attributes: ['empnum','preferred_name', 'position', 'email']
                // attributes: { exclude: ['password'] }
            });
    
            // If no user is found with the provided email, throw a custom error
            if (!foundUser) {
                throw new CustomError("Please check email and password", 404, "This email doesn't exist.");
            }
    
            // Compare the provided password with the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(pwd, foundUser.password);
    
            // If the passwords do not match, throw a custom error
            if (!passwordMatch) {
                throw new CustomError("Invalid password", 401, "The provided password is incorrect.");
            }
    
            // If the user is found and the passwords match
            if (foundUser && passwordMatch) {
                // Convert Sequelize instance to a plain JavaScript object
                foundUser = foundUser.get({ plain: true });
    
                // Generate a new JWT access token for the user
                const accessToken = jwt.sign(
                    { "username": foundUser.username },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }  // Token will expire in 30 seconds
                );
    
                // Generate a new JWT refresh token for the user
                const refreshToken = jwt.sign(
                    { "username": foundUser.username },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }  // Token will expire in 1 day
                );
    
                // Store the refresh token in the user's record in the database
                await User.update({ token: refreshToken }, {
                    where: { id: foundUser.id }
                });
    
                // (Commented) An option to delete the password from the user object (if necessary)
    
                // Set the refresh token as a cookie in the response
                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: false,  // Ensure your server supports HTTPS when using 'secure: true'
                    maxAge: 24 * 60 * 60 * 1000  // Cookie will expire in 1 day
                });
    
                // Return the access token in the response
                res.status(200).json({ accessToken });
            }
    
        } catch (error) {
            // Log any errors and pass them to the next middleware (possibly an error handler)
            console.log("ERROR CATCH 84 ", error);
            next(error);
        }
    };
    return {
        handleLogin
    }
}

module.exports = authController


// module.exports = {  };