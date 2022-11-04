const httpStatus = require('http-status');
const { Promo } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for product
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getPromo = async (filter, options) => {
  return await Promo.paginate(filter, options);
};

const getPromoSlider = async () => {
  return await Promo.paginate(
    {},
    {
      sortBy: 'priority:asc',
    }
  );
};

/**
 * Create a promo
 * @param {Object} userBody
 * @returns {Promise<DBInsert>}
 */
const createPromo = async ({ title, desc, image, location, type = 'perawatan', priority = 999 }) => {
  if (!image || !title || !desc || !location) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong Parameter');
  }
  return Promo.create({
    title,
    desc,
    image,
    priority,
    type,
    location,
  });
};

module.exports = {
  getPromo,
  createPromo,
  getPromoSlider,
};
