const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
import { Op } from "sequelize";
import sendByEmail from "../../utils/sendByEmail";
import crypto from "crypto";

const createTokenSendResponse = (user, res, next) => {
  const payload = {
    id: user.id,
    email: user.username,
    role: user.role,
  };
  const token = jwt.sign(
    payload,
    authConfig.TokenSECRET,
    authConfig.TokenOptions
  );

  if (!token)
    return res.status(401).json({ message: "Falha no momento para logar-se." });

  return res.status(200).json({ status: "success", token });
};

export const signup = async (req, res, next) => {
  try {
    const userEmailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userEmailExists)
      return res.status(409).json({
        status: "failed",
        message:
          "O endereço de email já está sendo utilizado por outra pessoa. Tente novamente com outro e-mail.",
      });

    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      avatar:
        "http://www.gravatar.com/avatar/e6ebbd9993d6b33b5fa08f809ed81b3c?d=404",
    };

    if (data.password !== req.body.passwordConfirm)
      return res.status(400).json({
        message: "As senhas não coincidem. Por favor, tente novamente.",
      });

    const user = await User.create(data);

    if (!user)
      return res.status(400).json({
        status: "failed",
        message: "Ocorreu um erro ao realizar o cadastro!",
      });

    await createTokenSendResponse(user, res, next);
  } catch (error) {
    return res.status(404).json({ status: "failed", message: error });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        status: "failed",
        message: "Você precisa preencher os campos.",
      });

    const userEmail = await User.findOne({ where: { email } });

    if (!userEmail)
      return res
        .status(401)
        .json({ status: "failed", message: `E-mail ${email} não existe!` });

    const userPassword = await userEmail.checkPassword(password);

    if (!userPassword)
      return res
        .status(401)
        .json({ status: "failed", message: `Senha invalida!` });

    await createTokenSendResponse(userEmail, res, next);
  } catch (error) {
    return res.status(404).json({ status: "failed", error: error.message });
  }
};

export const changePassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ message: "Digite um e-mail valido." });

  const emailExists = await User.findOne({
    where: { email },
  });
  if (!emailExists)
    return res
      .status(400)
      .json({ message: "Este e-mail não foi possivel encontrar." });

  const resetToken = emailExists.createPasswordResetToken();
  await emailExists.save({ validateBeforeSave: false });

  try {
    const resetUrl = `${process.env.APP_SITE}/resetpassword/${resetToken}`;
    const message = `Recebemos uma solicitação 
    para trocar sua senha da ${process.env.APP_NAME}. 
    Clique no link abaixo para escolher uma senha nova. \n\n ${resetUrl}`;

    await sendByEmail({
      email: emailExists.email,
      subject: "Recuperação de senha (valido até 10 minutos)",
      message: message,
    });
    return res
      .status(200)
      .json({ status: "success", message: "E-mail enviado!" });
  } catch (e) {
    userMail.password_reset_token = undefined;
    userMail.password_reset_expires = undefined;
    await userMail.save({ validateBeforeSave: false });
  }

  return res.status(200).json({ status: "success", emailExists });
};

const updateResetToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;

  try {
    const hashedToken = updateResetToken(token);
    if (!hashedToken)
      return res
        .status(400)
        .json({ message: "Não houve atualização no token." });

    const user = await User.findOne({
      where: {
        password_reset_token: hashedToken,
        password_reset_expires: {
          [Op.gt]: Date.now(),
        },
      },
    });

    if (!user)
      return res
        .status(400)
        .json({ message: "Token está invalido ou já expirou." });

    user.password = req.body.password;
    user.password_reset_token = null;
    user.password_reset_expires = null;

    await user.save();
    return res
      .status(200)
      .json({ message: "success", data: user.password_changed_at });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
