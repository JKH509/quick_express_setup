const express = require("express");
const firstController = require("../controllers/firstController");
const firstRouter = express.Router();


function router() {

  let {firstFunction} = firstController();

  firstRouter.route('/hello-world').get(firstFunction);

  return firstRouter;
};

module.exports = router;