const express = require("express");
const { cacheQuery } = require("../middlewares/cache");
const router = express.Router();
const Location = require("../services/location");
const { queryRequired, bodyRequired } = require("../utils/required");
const { success, failed } = require("../utils/respons");

router.get("/", cacheQuery("myLocation"), async (req, res) => {
  try {
    if (!req.query.provinceName) {
      queryRequired(req, ["lat", "long"]);
    }
    let result = await Location.findLocation({
      lat: req.query.lat,
      long: req.query.long,
      provinceName: req.query.provinceName ? req.query.provinceName : false,
    });
    success(
      res,
      {
        data: result,
      },
      req.cacheId
    );
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

router.get("/province", async (req, res) => {
  try {
    let result = await Location.listProvince();
    success(res, {
      data: result,
    });
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

router.post("/zone", async (req, res) => {
  try {
    bodyRequired(req, ["regionalId", "zoneName"]);
    let result = await Location.createZone({
      regionalId: req.body.regionalId,
      zoneName: req.body.zoneName,
    });
    success(res, {
      data: result,
    });
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

module.exports = router;
