const db = require('../models');
let User = db.User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Op } = require('sequelize'); // Import the Op object from Sequelize



// const handleLogin = async (req, res) => {
//   const { username, pwd } = req.body;
//   // console.log("USER PWD ", username, ' ', pwd)
//   // try {
//   //   console.log("USER PWD ", username, ' ', pwd)
//   // } catch (error) {
//   //   console.log("ERROR ", error)
//   // }

//   if (!username || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
//   // const foundUser = User.find(person => person.username === user);
//       const foundUser = await User.findOne({
//       where: {
//         user_name: username  // Assuming the column in your database is 'user_name'
//       }
//     });

//   if (!foundUser) return res.sendStatus(401); //Unauthorized 
//   // evaluate password 
//   const match = await bcrypt.compare(pwd, foundUser.password);
//   if (match) {
//       // create JWTs
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
//       // Saving refreshToken with current user
//       // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);

//       const otherUsers = await User.findAll({
//         where: {
//             user_name: {
//                 [Op.ne]: foundUser.username  // Using the "not equal" operator to exclude the found user
//             }
//         }
//     });

//       // const currentUser = { ...foundUser, refreshToken };
//       const currentUser = { ...foundUser.dataValues, refreshToken };

//       // usersDB.setUsers([...otherUsers, currentUser]);

//       await fsPromises.writeFile(
//           path.join(__dirname, '..', 'model', 'users.json'),
//           JSON.stringify(usersDB.users)
//       );

//       await foundUser.update({ token: refreshToken });

//       // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
//       // res.json({ accessToken });
//   } else {
//       res.sendStatus(401);
//   }
// }

const handleLogin = async (req, res) => {
  const { username, pwd } = req.body;

  if (!username || !pwd) 
      return res.status(400).json({ 'message': 'Username and password are required.' });

  // Find user
  const foundUser = await User.findOne({
      where: {
          user_name: username
      }
  });

  if (!foundUser) 
      return res.sendStatus(401); // Unauthorized 

  // Compare password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
      // Create JWTs
      const accessToken = jwt.sign(
          { "username": foundUser.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s' }
      );
      const refreshToken = jwt.sign(
          { "username": foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
      );

      // Update foundUser's refreshToken in the database
      await foundUser.update({ refreshToken });

      // E.g., send JWT in response or set it in a cookie
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
      res.json({ accessToken });

  } else {
      res.sendStatus(401);
  }
}


module.exports = { handleLogin };