// const express = require('express');
// const router = express.Router();
// const registerController = require('../controllers/registerController');

// router.post('/', registerController.handleNewUser);

// module.exports = router;

const express = require("express");
const registerController = require("../controllers/registerController");
const registerRouter = express.Router();

function router() {

  let {handleNewUser} = registerController();

  registerRouter.route('/register').post(handleNewUser);

  return registerRouter;
};

module.exports = router;