const models = require('../models');
const { Op } = require('sequelize');
const { deleteCache } = require('../utils/cache');

class Location {
  static async listPromo({
    page = 1,
    limit = 10,
    keyword = '',
    zoneId,
    type
  }) {
    let result = {
      data: [],
      meta: {
        page: Number(page),
        limit: Number(limit),
        total: 0
      }
    };
    let query = {
      limit: Number(limit),
      offset: Number(limit) * (Number(page) - 1),
      where: {
        zoneId,
        type
      }
    };
    if (keyword) {
      query.where.name = {
        [Op.like]: `%${keyword}%`
      }
    }
    let {count, rows} = await models.promotions.findAndCountAll(query);
    result.data = rows;
    result.meta.total = count
    return result
  }

  static async listPromoHighlight({
    zoneId,
  }) {
    let result = await models.promotions.findAll({
      where: {
        zoneId,
        highlight: true
      }
    });
    return {
      data: result
    }
  }

  static async createPromo({
    zoneId,
    name,
    description,
    imageUrl,
    type,
    highlight = false
  }) {
    let promoExist = await models.promotions.findOne({
      where: {
        zoneId,
        name
      },
    })

    if (promoExist){
      throw {
        message: 'Promo Already Exist'
      }
    }

    let result = await models.promotions.create({
      zoneId,
      name,
      type,
      description,
      imageUrl,
      highlight
    });

    deleteCache('promo');

    return {
      data: result
    };
  }

  static async editPromo({
    id,
    highlight,
    zoneId = null,
    name = null,
    description = null,
    imageUrl = null,
    type = null,
  }) {
    let promoExist = await models.promotions.findOne({
      where: {
        id
      },
    })

    if (!promoExist){
      throw {
        message: 'Promo Not Found'
      }
    }

    let payload = {
      highlight
    }

    if (zoneId) {
      payload.zoneId = zoneId;
    }

    if (name) {
      payload.name = name;
    }

    if (description) {
      payload.description = description;
    }

    if (imageUrl) {
      payload.imageUrl = imageUrl;
    }

    if (type) {
      payload.type = type;
    }

    let result = await promoExist.update(payload);

    deleteCache('promo');

    return {
      data: result
    };
  }
}

module.exports = Location;
