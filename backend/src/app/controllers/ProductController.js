const { Op } = require("sequelize");
var slugify = require("slugify");
const Product = require("../models/Product");
const Category = require("../models/Category");

export const allProducts = async (req, res, next) => {
  try {
    const products = await Product.findAndCountAll({
      order: [["title", "ASC"]],
      include: [
        {
          model: Category,
          as: "categorys",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    if (products.count < 1 && products.count === 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "Não existe nenhum produto!" });
    }

    return res
      .status(200)
      .json({ status: "success", total: products.count, data: products.rows });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error,
    });
  }
};

export const ratingProduct = async (req, res, next) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res
        .status(400)
        .json({ status: "failed", message: "Não existe nenhum produto!" });
    }
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "categorys",
          attributes: ["id", "name"],
          through: { attributes: [] },
          where: {
            name
          }
        },
      ],
      order: [["price", "ASC"]],
      limit: 4,
    });

    if (!products) {
      return res
        .status(400)
        .json({ status: "failed", message: "Não existe nenhum produto!" });
    }

    return res
      .status(200)
      .json({ status: "success", data: products });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error,
    });
  }
}

export const searchProduct = async (req, res, next) => {
  try {
    const { searchItem } = req.query;

    if (!searchItem)
      return res.status(400).json({
        error: "Filtros para pesquisar produtos não foram encontrados!",
      });

    const searchProducts = await Product.findAll({
      include: [
        {
          model: Category,
          as: "categorys",
          attributes: ["id", "name"],
          through: { attributes: [] }
        },
      ],
      where: {
        title: {
          [Op.like]: `%${searchItem}%`,
        },
      },
    });

    return res.status(200).json({ status: "success", data: searchProducts });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error,
    });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = {
      cod_product: req.body.cod_product,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: slugify(req.body.title),
      image_url: req.body.image_url,
      unit: req.body.unit,
      details: req.body.details
    };
    const { categorys } = req.body;

    const products = await Product.create(data);

    if (!products)
      return res.status(400).json({
        status: "failed",
        message: "Não foi possivel cadastrar produto",
      });

    if (categorys && categorys.length > 0) {
      await products.setCategorys(categorys);
    }

    return res.status(200).json({ status: "success", data: products });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error,
    });
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const product = await Product.findOne({ where: { id } });
    if (!product) return res.status(400).json({ status: 'failed', message: 'Product not found' });

    product.update(body);

    const productUpdate = await product.save();

    //const productUpdate = await Product.update(body, { where: { id } });

    return res.status(200).json({ status: "success", data: productUpdate });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error,
    });
  }
}

export const getProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    //console.log(typeof req.param.path);
    const product = await Product.findOne({
      include: [
        {
          model: Category,
          as: "categorys",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
      where: { slug }
    });

    if (!product)
      return res.status(400).json({
        status: "failed",
        message: `URL ${slug} do produto não existe!`,
      });

    return res.status(200).json({ status: "success", data: product });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const getFindByIdProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      attributes: ['id', 'cod_product', 'title', 'price', 'unit', 'image_url'],
      where: { id }
    });

    if (!product)
      return res.status(400).json({
        status: "failed",
        message: `URL ${id} do produto não existe ou está mal informado!`,
      });

    return res.status(200).json({ status: "success", data: product });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
}