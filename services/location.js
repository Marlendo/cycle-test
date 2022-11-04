const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 6;

class Location {

  static async findLocation({
    lat, long
  }) {
    try {
      return {
        lat, long
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = Location;
