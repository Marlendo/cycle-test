'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Village extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Model associations
      this.belongsTo(models.districts)
    }
  };
  Village.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    district_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'districts',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'villages',
  });
  return Village;
};
