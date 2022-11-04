"use strict";
const { Model, DataTypes } = require("sequelize");
const enumPromoType = require("../constant/enumPromoType.json");

module.exports = (sequelize) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Model associations
      this.hasMany(models.clinic_operations);
      this.belongsTo(models.provinces);
      this.belongsTo(models.regencies, {
        sourceKey: 'regency_id',
        foreignKey: 'regencie_id'
      });
      this.belongsTo(models.districts);      
      this.belongsTo(models.villages);
    }
  }
  Clinic.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      provinceId: {
        type: DataTypes.CHAR(2),
        field: 'province_id',
      },
      districId: {
        type: DataTypes.CHAR(7),
        field: "district_id",
      },
      regencieId: {
        type: DataTypes.CHAR(4),
        field: "regencie_id",
      },
      vilageId: {
        type: DataTypes.CHAR(10),
        field: "village_id",
      },
      address: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      imageUrl: {
        type: DataTypes.STRING,
        field: "image_url",
      },
      waNo: {
        type: DataTypes.STRING,
        field: "wa_no",
      },
      phone: {
        type: DataTypes.STRING,
        field: "phone",
      },
      latitude: {
        type: DataTypes.STRING,
        field: "phone",
      },
      longitude: {
        type: DataTypes.STRING,
        field: "phone",
      },
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "clinics",
    }
  );
  return Clinic;
};
