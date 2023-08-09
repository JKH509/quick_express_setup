const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

function router() {

  let {handleLogin} = authController();

  authRouter.route('/auth').post(handleLogin);

  return authRouter;
};

module.exports = router;