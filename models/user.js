"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Exercise, { foreignKey: "user_id" });
      User.hasMany(models.Workout, { foreignKey: "user_id" });
      User.hasMany(models.ExerciseDetail, { foreignKey: "user_id" });
      User.hasMany(models.Day, { foreignKey: "user_id" });
      User.hasMany(models.WorkoutHeader, { foreignKey: "user_id" });
      User.hasMany(models.TargetedMuscle, { foreignKey: "user_id" });
      User.hasMany(models.ExerciseHistory, { foreignKey: "user_id" });
      User.hasMany(models.Token, { foreignKey: "user_id" });
      User.hasMany(models.Equipment, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      roles: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
