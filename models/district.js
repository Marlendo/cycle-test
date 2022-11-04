'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Model associations
      this.belongsTo(models.regencies);
    }
  };
  District.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    regency_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'regencies',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'districts',
  });
  return District;
};
