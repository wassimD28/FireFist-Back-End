"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Day extends Model {
    static associate(models) {
      Day.hasMany(models.ExerciseDetail, { foreignKey: "day_id" });
      Day.hasMany(models.WorkoutHeader, { foreignKey: "workoutHeader_id" });
      Day.belongsTo(models.User, { foreignKey: "user_id" });
      Day.belongsTo(models.Workout, { foreignKey: "workout_id" });
    }
  }
  Day.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Day",
    }
  );
  return Day;
};
