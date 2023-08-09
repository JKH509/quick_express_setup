const db = require('../models');
let User = db.User
require('dotenv').config();


const usercontroller =()=> {

  const getAllUsers = async (req, res, next) => {
    try {
      // await User.findAll({})
      const users = await User.findAll();
// console.log(users);
res.status(200).json({users})
    } catch (error) {
      next(error)
    }
  }

  return {
    getAllUsers
  }

}
module.exports = usercontroller