"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      Exercise.belongsTo(models.User, { foreignKey: "user_id" });
      Exercise.belongsTo(models.Category, { foreignKey: "category_id" });
      Exercise.belongsTo(models.Difficulty, { foreignKey: "difficulty_id" });
      Exercise.belongsTo(models.ValueCounter, {foreignKey: "valueCounter_id"});
      Exercise.hasMany(models.ExerciseDetail, { foreignKey: "exercise_id" });
      Exercise.hasMany(models.TargetedMuscle, { foreignKey: "exercise_id" });
      Exercise.hasMany(models.ExerciseHistory, { foreignKey: "exercise_id" });
      Exercise.belongsToMany(models.Equipment, {
        through: "exercise_equipment",
        foreignKey: "exercise_id",
      });
    }
  }
  Exercise.init(
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
      videoLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      privacy: {
        type: DataTypes.ENUM("PUBLIC", "PRIVATE", "FRIENDS"),
        allowNull: false,
        defaultValue: "PRIVATE",
      },
    },
    {
      sequelize,
      modelName: "Exercise",
    }
  );
  return Exercise;
};
