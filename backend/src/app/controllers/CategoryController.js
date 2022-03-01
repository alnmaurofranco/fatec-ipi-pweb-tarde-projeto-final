const Product = require("../models/Product");

const Category = require("../models/Category");

export const index = async (req, res, next) => {
  try {
    const categorys = await Category.findAndCountAll({
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id", "title"],
          through: { attributes: [] },
        },
      ],
      attributes: ["id", "name"],
      limit: 12,
    });

    if (categorys.count < 1 && categorys.count === 0)
      return res
        .status(400)
        .json({ status: "failed", message: "Não existe nenhuma categoria" });

    return res.status(200).json({
      status: "success",
      total: categorys.count,
      data: categorys.rows,
    });
  } catch (error) {
    return res.status(404).json({ status: "failed", error });
  }
};

export const searchCategory = async (req, res, next) => {
  const { search } = req.params;

  if (!search)
    return res.status(400).json({
      error: "Filtros para pesquisar produtos não foram encontrados!",
    });

  try {
    const categorys = await Category.findAndCountAll({
      include: [
        {
          model: Product,
          as: "products",
          through: { attributes: [] },
        },
      ],
      attributes: ["id", "name"],
      where: {
        name: search,
      },
    });

    if (categorys.count < 1 && categorys.count === 0)
      return res
        .status(400)
        .json({ status: "failed", message: "Não existe nenhuma categoria" });

    return res.status(200).json({ status: "success", data: categorys.rows });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const categorys = await Category.findOrCreate({
      where: { name },
    });

    if (!categorys) return res.status(400).json({ status: "failed" });

    return res.status(201).json({ status: "success", data: categorys });
  } catch (error) {
    return res.status(404).json({ status: "failed", error });
  }
};
