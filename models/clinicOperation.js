"use strict";
const { Model, DataTypes, INTEGER } = require("sequelize");
const enumHari = require("../constant/enumHari.json");

module.exports = (sequelize) => {
  class ClinicOperation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Model associations
      
      this.belongsTo(models.clinics);
    }
  }
  ClinicOperation.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      clinicId: {
        type: DataTypes.INTEGER,
        field: 'clinic_id',
      },
      day: {
        type: DataTypes.ENUM(enumHari),
      },
      openAt: {
        field: 'open_at',
        type: DataTypes.TIME
      },
      closeAt: {
        field: 'close_at',
        type: DataTypes.TIME
      }
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "clinic_operations",
    }
  );
  return ClinicOperation;
};
