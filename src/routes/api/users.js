const express = require("express");
const usersController = require("../../controllers/usersController");
const userRouter = express.Router();

function router() {

  let {getAllUsers} = usersController();

  userRouter.route('/users').get(getAllUsers);

  return userRouter;
};

module.exports = router;