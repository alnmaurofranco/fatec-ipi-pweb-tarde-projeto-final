const User = require("../models/User");

export const allUsers = async (req, res) => {
  try {
    const users = await User.findAndCountAll({ limit: 12 });

    if (users.count < 1 && users.count === 0)
      return res
        .status(400)
        .json({ message: "Nenhum usuario foi cadastrado no momento!" });

    return res
      .status(200)
      .json({ status: "success", total: users.count, data: users.rows });
  } catch (error) {
    return res.status(404).json({ status: "failed", error });
  }
};

export const create = async (req, res) => {
  const data = req.body;

  try {
    const users = await User.create(data);

    return res.status(201).json({ status: "success", data: users });
  } catch (error) {
    return res.status(400).json({ status: "failed", erros: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userExists = await User.findOne({ where: { id } });

    if (!userExists)
      return res.status(400).json({
        status: "failed",
        message: `Não existe usuario com esse ${id}`,
      });

    const userDestroy = await User.destroy({ where: { id: userExists.id } });

    return res.status(204).json(userDestroy);
  } catch (error) {
    return res.status(404).json({ status: "failed", error: error.message });
  }
};
