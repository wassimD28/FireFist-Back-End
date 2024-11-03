"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Path extends Model {
    static associate(models) {
      Path.belongsTo(models.Muscle, { foreignKey: "muscle_id" });
      Path.belongsToMany(models.BodyDiagram, { through:"bodyDiagram_Path", foreignKey: "path_id" });
    }
  }
  Path.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      side: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["left", "right", "none"],
        defaultValue: "none",
      },
      path:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      viewMode:{
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["simple", "advanced"],
        defaultValue: "simple",
      },
      viewAngle:{
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["front", "back", "lateral"],
        defaultValue: "front",
      },
      group:{
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Path",
    }
  );
  return Path;
};
