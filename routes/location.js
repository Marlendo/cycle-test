const express = require("express");
const router = express.Router();
const Location = require("../services/location");
const { queryRequired } = require("../utils/required");
const { success, failed } = require("../utils/respons");

router.get("/", async (req, res) => {
  try {
    queryRequired(req, ['lat', 'long']);
    let result = await Location.findLocation({
      lat: req.query.lat,
      long: req.query.long,
    });
    success(res, {
      data: result
    })
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message
    })
  }
});

router.get("/province", async (req, res) => {
  try {
    let result = await Location.listProvince();
    success(res, {
      data: result
    })
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message
    })
  }
});

module.exports = router;
