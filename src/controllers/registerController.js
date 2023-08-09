const db = require('../models');
let User = db.User
const bcrypt = require('bcrypt');

const registerController =()=>{
  
  const handleNewUser = async (req, res) => {
    const { username, pwd } = req.body;
    if (!username || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({
      where: {
        user_name: username  // Assuming the column in your database is 'user_name'
      }
    });
    if (duplicate) return res.sendStatus(409); //Conflict 
  
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //create the new user
        const newUser = await User.create({
          user_name: username,
          password: hashedPwd,
      });
        console.log(newUser.get());
        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
  }
  return {
    handleNewUser
  }
}


module.exports =  registerController ;