const { Router } = require("express");
//CONTROLLER
const { profile } = require("../controllers/AccountController");
//MIDDLEWARES
const { accessToken } = require("../middlewares/auth");
const accountRouter = Router();

accountRouter.use(accessToken);
accountRouter.get("/", profile);

module.exports = accountRouter;
