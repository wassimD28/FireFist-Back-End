"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ValueCounter extends Model {
    static associate(models) {}
  }
  ValueCounter.init(
    {
      name: {
        type: DataTypes.ENUM,
        allowNull: false,
        unique: true,
        values: [
          "reps",
          "duration",
          "reps and weight",
          "reps and duration",
          "weight and duration",
        ],
        defaultValue: "reps",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ValueCounter",
    }
  );
  return ValueCounter;
};
