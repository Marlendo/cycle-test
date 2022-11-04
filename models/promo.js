"use strict";
const { Model, DataTypes } = require("sequelize");
const enumPromoType = require("../constant/enumPromoType.json");

module.exports = (sequelize) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Model associations
      this.belongsTo(models.zones);
    }
  }
  Promo.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      zoneId: {
        type: DataTypes.INTEGER,
        field: "zone_id",
        references: {
          model: "zones",
          key: "id",
        },
      },
      type: {
        type: DataTypes.ENUM(enumPromoType),
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "promotions",
    }
  );
  return Promo;
};
