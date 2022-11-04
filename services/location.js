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
  static async findLocation({ lat, long }) {
    let reverseGeocode = await geocoder.reverse({ lat: Number(lat), lon: Number(long) });
    let lowerLevelGeocode = mapSafe(() => reverseGeocode[0].administrativeLevels.level4short, false);
    if (!lowerLevelGeocode) {
      throw {
        data: reverseGeocode,
        message: 'Locations Not Found'
      }
    }
    let result = await models.villages.findOne({
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
    return result;
  }

  static async listProvince() {
    return await models.provinces.findAll();
  }
}

module.exports = Location;
