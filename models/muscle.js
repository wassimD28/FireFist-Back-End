"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Muscle extends Model {
    static associate(models) {
      Muscle.hasMany(models.TargetedMuscle, { foreignKey: "muscle_id" });
      Muscle.hasMany(models.Path, { foreignKey: "muscle_id" });
    }
  }
  Muscle.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      partOf: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [
          "upper body",
          "core",
          "lower body",
          "other",
        ],
        defaultValue: "upper body",
      },
    },
    {
      sequelize,
      modelName: "Muscle",
    }
  );
  return Muscle;
};
