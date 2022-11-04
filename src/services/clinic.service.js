const httpStatus = require('http-status');
const { Clinic } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for product
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getClinic = async (filter, options) => {
  return await Clinic.paginate(filter, options);
};

/**
 * Create a promo
 * @param {Object} userBody
 * @returns {Promise<DBInsert>}
 */
const createClinic = async ({ name, image, province, city, address, googleMapsUrl, openSchedule, whatsapp, phone }) => {
  if (!name || !image || !province || !city || !address || !googleMapsUrl || !openSchedule || !whatsapp || !phone) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong Parameter');
  }
  return Clinic.create({
    name,
    image,
    province,
    city,
    address,
    googleMapsUrl,
    openSchedule,
    whatsapp,
    phone,
  });
};

module.exports = {
  getClinic,
  createClinic,
};
