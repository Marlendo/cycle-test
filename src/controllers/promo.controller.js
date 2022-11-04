const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { promoService } = require('../services');

//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

const getPromo = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['keyword', 'location', 'type']);
  const options = pick(req.query, ['page', 'limit']);
  const result = await promoService.getPromo(filter, options)
  res.send(result);
});

const getPromoSlider = catchAsync(async (_req, res) => {
  const result = await promoService.getPromoSlider()
  res.send(result);
});

const createPromo = catchAsync(async (req, res) => {
  const result = await promoService.createPromo(req.body)
  res.send(result);
});

module.exports = {
  getPromo,
  createPromo,
  getPromoSlider
};
