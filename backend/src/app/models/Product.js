const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_product: {
          type: DataTypes.STRING,
        },
        title: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.TEXT,
        },
        slug: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.NUMBER,
        },
        details: {
          type: DataTypes.TEXT,
        },
        image_url: {
          type: DataTypes.STRING,
        },
        unit: {
          type: DataTypes.NUMBER,
        },
      },
      {
        sequelize,
        tableName: "products",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Category, {
      foreignKey: "product_id",
      through: "categorys_products",
      as: "categorys",
    });
  }
}

module.exports = Product;
