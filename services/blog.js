const models = require("../models");
const { Op } = require("sequelize");
const { deleteCache } = require("../utils/cache");
const { enumBodyRequired } = require("../utils/required");

class Clinic {
  static async listBlogCategory() {
    return {
      data: await models.category_blogs.findAll(),
    };
  }

  static async createBlogCategory({ name, slug }) {
    let exist = await models.category_blogs.findOne({
      where: {
        name,
        slug,
      },
    });
    if (exist) {
      throw {
        message: "Blog Category Already Exist",
      };
    }
    let result = await models.category_blogs.create({
      name,
      slug,
    });
    return {
      data: result,
    };
  }

  static async listBlog({ keyword = "", categoryId, page = 1, limit = 10 }) {
    let result = {
      data: [],
      meta: {
        page: Number(page),
        limit: Number(limit),
        total: 0,
      },
    };
    let query = {
      limit: Number(limit),
      offset: Number(limit) * (Number(page) - 1),
      where: {
        categoryId,
      },
    };
    if (keyword) {
      query.where.name = {
        [Op.like]: `%${keyword}%`,
      };
    }
    let { count, rows } = await models.blogs.findAndCountAll(query);
    result.data = rows;
    result.meta.total = count;
    return result;
  }

  static async createBlog({
    categoryId,
    slug,
    title,
    subtitle,
    imageUrl,
    content,
  }) {
    let blogExist = await models.blogs.findOne({
      where: {
        categoryId,
        slug,
        title
      },
    });
    if (blogExist) {
      throw {
        message: "Blogs Already Exist",
      };
    }

    deleteCache("blogs");
    let result = await models.blogs.create({
      categoryId,
      slug,
      title,
      subtitle,
      imageUrl,
      content,
    });
    return { data: result };
  }
}

module.exports = Clinic;
