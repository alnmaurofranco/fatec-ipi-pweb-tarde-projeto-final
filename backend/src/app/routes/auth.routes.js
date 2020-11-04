const { Router } = require("express");
//CONTROLLER
const { login, signup, changePassword, resetPassword } = require("../controllers/AuthController");
const authRoutes = Router();

authRoutes.get("/", (req, res) => {
  return res.json({ message: "Area de autenticação" });
});

authRoutes.post("/login", login);
authRoutes.post("/signup", signup);
authRoutes.post('/forgot-password', changePassword);
authRoutes.put('/resetpassword/:token', resetPassword);

module.exports = authRoutes;
