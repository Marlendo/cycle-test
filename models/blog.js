"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Model associations
      
      this.belongsTo(models.category_blogs);
    }
  }
  Blog.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        field: 'category_id'
      },
      slug: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      subtitle: {
        type: DataTypes.STRING,
      },
      imageUrl: {
        type: DataTypes.STRING,
        field: 'image_url'
      },
      content: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "blogs",
    }
  );
  return Blog;
};
