"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Token.init(
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
