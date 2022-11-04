'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Zone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Model associations
      this.belongsTo(models.regionals)
    }
  };
  Zone.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    regionalId: {
      type: DataTypes.INTEGER,
      field: 'regional_id',
      references: {
        model: 'regionals',
        key: 'id',
      }
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'zones',
  });
  return Zone;
};
