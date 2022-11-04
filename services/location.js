const NodeGeocoder = require("node-geocoder");
const { mapSafe } = require("../utils/safe");
const models = require('../models');
const { Op } = require('sequelize');

const options = {
  provider: 'google',
  // Optional depending on the providers
  // fetch: customFetchImplementation,
  apiKey: process.env.GOOGLE_MAP_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);
class Location {
  static async findLocation({ lat, long, provinceName = false }) {
    let lowerLevelGeocode = provinceName;
    if (lat && long) {
      let reverseGeocode = await geocoder.reverse({ lat: Number(lat), lon: Number(long) });
      lowerLevelGeocode = mapSafe(() => reverseGeocode[0].administrativeLevels.level4short, reverseGeocode);
    }
    if (!lowerLevelGeocode) {
      throw {
        message: 'Locations Not Found'
      }
    }
    let rawResult = await models.villages.findOne({
      include: [{
        model: models.districts,
        required: false,
        include: [{
          model: models.regencies,
          required: false,
          include: [{
            model: models.provinces,
            required: false,
          }]
        }]
      }],
      where: {
        name: {
          [Op.like]: `%${lowerLevelGeocode}%`
        }
      }
    })
    let province = mapSafe(() => rawResult.district.regency.province, false);
    if (!province.id) {
      throw {
        message: 'Province Not Found'
      }
    }
    let regional = await models.regionals.findOne({
      where: {
        provinceId: province.id
      },
      include: [{
        model: models.zones,
        required: false,
      }]
    })
    if (!regional) {
      regional = await models.regionals.create({
        provinceId: province.id,
        name: province.name
      })
    }
    let zone = await models.zones.findOne({
      where: {
        regionalId: regional.id
      }
    });
    if (!zone) {
      throw {
        message: 'Zone Not Exist'
      }
    }
    return {
      zoneId: zone.id,
      regional: {
        id: regional.id,
        name: regional.name
      },
      province: {
        id: mapSafe(() => rawResult.district.regency.province.id, null),
        name: mapSafe(() => rawResult.district.regency.province.name, null)
      },
      regency: {
        id: mapSafe(() => rawResult.district.regency.id, null),
        name: mapSafe(() => rawResult.district.regency.name, null),
      },
      district: {
        id: mapSafe(() => rawResult.district.id, null),
        name: mapSafe(() => rawResult.district.name, null),
      },
      vilage: {
        id: rawResult.id ? rawResult.id : null,
        name: rawResult.name ? rawResult.name : null
      }
    }
  }

  static async listProvince() {
    return await models.provinces.findAll();
  }

  static async createZone({regionalId, zoneName}) {
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
