const { promisify } = require("util");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

export const accessToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res.status(401).json({
      status: "failed",
      message: "Você não está logado! Faça o login para obter acesso",
    });

  const decoded = await promisify(jwt.verify)(token, authConfig.TokenSECRET);

  const currentUser = await User.findByPk(decoded.id);

  if (!currentUser)
    return res.status(401).json({ message: "Token não existe mais" });

  req.sessionUser = currentUser;
  next();
};

export const accessTokenAdmin = async (req, res, next) => {
  if (req.sessionUser.role === "admin") return next();

  res.status(403).json({
    status: "failed",
    message: "Você não tem um cargo superior ao de administrador para acessar!",
  });
};
