"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Difficulty extends Model {
    static associate(models) {}
  }
  Difficulty.init(
    {
      name: {
        type: DataTypes.ENUM,
        allowNull: false,
        unique: true,
        values: ["beginner", "intermediate", "advanced"],
        defaultValue: "intermediate",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Difficulty",
    }
  );
  return Difficulty;
};
