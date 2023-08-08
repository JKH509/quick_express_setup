// import frm the db -> db.User
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');



const signup = async (userData) => {
  console.log("USER DATA ",userData)
    // Create a new user
    // const user = await User.create({
    //     username: userData.username,
    //     email: userData.email,
    //     password: hashedPassword,
    // });
  // Create a new user
    // const user = new User(userData.username, userData.email, userData.password);
    return user;
};

const signin = async (userData) => {
  console.log("USER DATA ",userData)


};

module.exports = {
    signup,
    signin
};