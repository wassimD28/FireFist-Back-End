"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SetHistory extends Model {
    static associate(models) {
      SetHistory.belongsTo(models.ExerciseHistory, {
        foreignKey: "exerciseHistory_id",
      });
    }
  }
  SetHistory.init(
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
      modelName: "SetHistory",
    }
  );
  return SetHistory;
};
