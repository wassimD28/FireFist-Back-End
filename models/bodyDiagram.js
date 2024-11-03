"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BodyDiagram extends Model {
    static associate(models) {
      BodyDiagram.belongsToMany(models.Path, {through: "bodyDiagram_Path" , foreignKey: "bodyDiagram_id" });
    }
  }
  BodyDiagram.init(
    {
      path: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      viewMode: {
        type: DataTypes.ENUM,
        values: ["simple", "advanced"],
        defaultValue: "simple",
        allowNull: false,
      },
      viewAngle: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["front", "back", "lateral"],
        defaultValue: "front",
      },
    },
    {
      sequelize,
      modelName: "BodyDiagram",
    }
  );
  return BodyDiagram;
};
