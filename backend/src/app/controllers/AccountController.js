export const profile = async (req, res, next) => {
  if (!req.sessionUser)
    return res.status(404).json({
      status: "failed",
      message: "O Usuario precisa estár logado para acessar o profile.",
    });

  return res.status(200).json({ status: "success", user: req.sessionUser });
};