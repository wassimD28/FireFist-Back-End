"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExerciseHistory extends Model {
    static associate(models) {
      ExerciseHistory.hasMany(models.SetHistory, {
        foreignKey: "exerciseHistory_id",
      });
      ExerciseHistory.belongsTo(models.Exercise, { foreignKey: "exercise_id" });
      ExerciseHistory.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  ExerciseHistory.init(
    {
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restAfterExer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ExerciseHistory",
    }
  );
  return ExerciseHistory;
};
