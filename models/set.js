"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Set extends Model {
    static associate(models) {
      Set.belongsTo(models.ExerciseDetail, { foreignKey: "exerciseDetail_id" });
    }
  }
  Set.init(
    {
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reps: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      restAfterSet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 60,
      },
    },
    {
      sequelize,
      modelName: "Set",
    }
  );
  return Set;
};
