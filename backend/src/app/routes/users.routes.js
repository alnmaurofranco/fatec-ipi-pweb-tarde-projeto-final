const { Router } = require("express");
//Middlewares
const { accessToken, accessTokenAdmin } = require("../middlewares/auth");
//Controller
const {
  allUsers,
  create,
  deleteUser,
  update
} = require("../controllers/UserController");
const userRouter = Router();

userRouter.use(accessToken, accessTokenAdmin);
//MOSTRAR TODOS OS USUARIOS
userRouter.get("/", allUsers);
//CRIAR USUARIO
userRouter.post("/create", create);
//VISUALIZAR OS USUARIOS A PARTIR DO ID
//ALTERAR USUARIO
userRouter.put("/update/:id", update);
//EXCLUIR USUARIO
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
