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
      // Model associations
      this.belongsTo(models.provinces);
      this.hasOne(models.zones);
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
      references: {
        model: 'provinces',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'regionals',
  });
  return Regional;
};
