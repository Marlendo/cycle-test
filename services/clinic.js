const models = require("../models");
const { Op } = require("sequelize");
const { deleteCache } = require("../utils/cache");
const { enumBodyRequired } = require("../utils/required");

class Clinic {
  static async listClinic({ keyword = "", regencieId = false, districId = false }) {
    let query = {};
    if (keyword) {
      query.name = {
        [Op.like]: `%${keyword}%`,
      };
    }
    if (regencieId) {
      query.regencieId = regencieId;
    }
    if (districId) {
      query.districId = districId;
    }
    let result = await models.clinics.findAll({
      where: query,
      attributes: {
        exclude: ['provinceId', 'districId', 'regencieId', 'vilageId']
      },
      include: [{
        model: models.provinces,
        required: false,
        attributes: ['id', 'name']
      }, {
        model: models.regencies,
        required: false,
        attributes: ['id', 'name']
      }, {
        model: models.districts,
        required: false,
        attributes: ['id', 'name']
      }, {
        model: models.villages,
        required: false,
        attributes: ['id', 'name']
      }]
    });
    return {
      data: result,
    };
  }

  static async createClinic({
    provinceId,
    districId,
    regencieId,
    vilageId,
    address,
    name,
    imageUrl,
    waNo,
    phone,
    latitude,
    longitude,
  }) {
    let clinicExist = await models.clinics.findOne({
      where: {
        provinceId,
        districId,
        regencieId,
        vilageId,
      },
    });
    if (clinicExist) {
      throw {
        message: "Clinic Already Exist",
      };
    }

    deleteCache("clinic");
    let result = await models.clinics.create({
      provinceId,
      districId,
      regencieId,
      vilageId,
      address,
      name,
      imageUrl,
      waNo,
      phone,
      latitude,
      longitude,
    });
    return { data: result };
  }
}

module.exports = Clinic;
