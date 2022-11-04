'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Regional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //// WARNING BUG FROM SEQUELIZE & MYSQL MUST DISABLE WHEN FIRST ALTER TABLE TABLE
      this.belongsTo(models.provinces); // THIS
      this.hasOne(models.zones); // THIS
    }
  };
  Regional.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    provinceId: {
      type: DataTypes.INTEGER,
      field: 'province_id',
      references: { // THIS
        model: 'provinces', // THIS
        key: 'id', // THIS
      } // THIS
    },
    name: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    modelName: 'regionals',
  });
  return Regional;
};
