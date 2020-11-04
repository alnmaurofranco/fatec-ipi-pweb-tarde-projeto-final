const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: "categorys",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Product, {
      foreignKey: "category_id",
      through: "categorys_products",
      as: "products",
    });
  }
}

module.exports = Category;
