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
    regencyId: {
      type: DataTypes.INTEGER,
      field: 'regency_id',
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
    timestamps: false,
    modelName: 'districts',
  });
  return District;
};
