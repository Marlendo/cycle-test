const models = require('../models');
const { Op } = require('sequelize');


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

  static async createPromo({regionalId, zoneName}) {
    let regionalIdExist = await models.regionals.findOne({
      where: {
        id: regionalId
      },
    })
    if (!regionalIdExist) {
      throw {
        message: 'Regional ID Not Exist'
      }
    }
    let exist = await models.zones.findOne({
      where: {
          [Op.or]: [{
            name: zoneName
          }, {
            regionalId
          }]
      }
    });

    if (exist) {
      throw {
        message: 'Zone Already Exist'
      }
    }

    let result = await models.zones.create({
      regionalId,
      name: zoneName.toUpperCase(),
    })

    return result;
  }
}

module.exports = Location;
