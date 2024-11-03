"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WorkoutHeader extends Model {
    static associate(models) {
      WorkoutHeader.belongsTo(models.Day, { foreignKey: "workoutHeader_id" });
      WorkoutHeader.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  WorkoutHeader.init(
    {
      order: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["small", "medium", "large"],
        defaultValue: "medium",
      },
    },
    {
      sequelize,
      modelName: "WorkoutHeader",
    }
  );
  return WorkoutHeader;
};
