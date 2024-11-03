"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExerciseDetail extends Model {
    static associate(models) {
      ExerciseDetail.belongsTo(models.Exercise, { foreignKey: "exercise_id" });
      ExerciseDetail.belongsTo(models.User, { foreignKey: "user_id" });
      ExerciseDetail.belongsTo(models.Day, { foreignKey: "day_id" });
      ExerciseDetail.hasMany(models.Set, { foreignKey: "exerciseDetail_id" });
    }
  }
  ExerciseDetail.init(
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
        defaultValue: 60
      },
    },
    {
      sequelize,
      modelName: "ExerciseDetail",
    }
  );
  return ExerciseDetail;
};
