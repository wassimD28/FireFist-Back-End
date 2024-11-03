"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Exercise, { foreignKey: "category_id"});
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.ENUM,
        allowNull: false,
        unique: true,
        values: ["cardio", "strength", "flexibility"],
        defaultValue: "strength",
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
      modelName: "Category",
    }
  );
  return Category;
};
