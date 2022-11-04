'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Regencie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Model associations
      this.belongsTo(models.provinces)
    }
  };
  Regencie.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,      
    },
    province_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'provinces',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'regencies',
  });
  return Regencie;
};
