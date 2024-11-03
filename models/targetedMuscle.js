"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TargetedMuscle extends Model {
    static associate(models) {
      TargetedMuscle.belongsTo(models.Muscle, { foreignKey: "muscle_id" });
      TargetedMuscle.belongsTo(models.User, { foreignKey: "user_id" });
      TargetedMuscle.belongsTo(models.Exercise, { foreignKey: "exercise_id" });
    }
  }
  TargetedMuscle.init(
    {
      pressureLevel: {
        type: DataTypes.ENUM,
        values: ["low", "medium", "high", "very hight"],
        defaultValue: "medium",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TargetedMuscle",
    }
  );
  return TargetedMuscle;
};
