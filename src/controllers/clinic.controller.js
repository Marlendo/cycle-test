const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { clinicService } = require('../services');

const getClinic = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['keyword', 'province', 'city']);
  const options = pick(req.query, ['page', 'limit']);
  const result = await clinicService.getClinic(filter, options)
  res.send(result);
});

const createClinic = catchAsync(async (req, res) => {
  const result = await clinicService.createClinic(req.body)
  res.send(result);
});

module.exports = {
  getClinic,
  createClinic
};
