const express = require("express");
const logoutController = require("../controllers/logoutController");
const logoutRouter = express.Router();


function router() {

  let {handleLogout} = logoutController();

  logoutRouter.route('/logout').get(handleLogout);

  return logoutRouter;
};

module.exports = router;