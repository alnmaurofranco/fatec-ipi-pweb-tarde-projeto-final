"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(35),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.INTEGER(13),
      },
      cpf: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM("user", "admin"),
        defaultValue: "user",
      },
      verified_email: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      password_changed_at: {
        type: Sequelize.DATE,
      },
      password_reset_token: {
        type: Sequelize.STRING,
      },
      password_reset_expires: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
