const { Sequelize } = require("sequelize");
const dbConfig = require("../../config/db");
//MODELS
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");

const connection = new Sequelize(dbConfig);

connection
  .authenticate()
  .then(() => {
    console.log("[SEQUELIZE] Connection has ben established successfully!");
  })
  .catch((e) => {
    console.log(
      `[SEQUELIZE] Não foi possível conectar com base de dados. \n\n ERROR: ${e}`
    );
    connection.close();
    //process.exit(1);
  });

User.init(connection);
Product.init(connection);
Category.init(connection);

Product.associate(connection.models);
Category.associate(connection.models);

module.exports = connection;
