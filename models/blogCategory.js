"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class BlogCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // Model associations
      
      // this.belongsTo(models.clinics);
    }
  }
  BlogCategory.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "category_blogs",
    }
  );
  return BlogCategory;
};
