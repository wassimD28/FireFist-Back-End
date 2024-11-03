"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate(models) {
      Equipment.belongsTo(models.User, { foreignKey: "user_id" });
      Equipment.belongsToMany(models.Exercise, {
        through: "exercise_equipment",
        foreignKey: "equipment_id",
      });
    }
  }
  Equipment.init(
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
    },
    {
      sequelize,
      modelName: "Equipment",
    }
  );
  return Equipment;
};
