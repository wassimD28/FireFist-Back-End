"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    static associate(models) {
      Workout.belongsTo(models.User, { foreignKey: "user_id" });
      Workout.hasMany(models.Day, { foreignKey: "workout_id" });
    }
  }
  Workout.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      expected_duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      num_of_exers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      privacy: {
        type: DataTypes.ENUM("PUBLIC", "PRIVATE", "FRIENDS"),
        allowNull: false,
        defaultValue: "PRIVATE",
      },
      banner_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Workout",
    }
  );
  return Workout;
};
