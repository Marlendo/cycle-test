const express = require("express");
const { cacheQuery } = require("../middlewares/cache");
const router = express.Router();
const Clinic = require("../services/clinic");
const {
  enumQueryRequired,
  queryRequired,
  bodyRequired,
  enumBodyRequired,
} = require("../utils/required");
const { success, failed } = require("../utils/respons");
const enumHari = require("../constant/enumHari.json");

router.get("/", cacheQuery("clinic"), async (req, res) => {
  try {
    queryRequired(req, ['districId']);
    let result = await Clinic.listClinic(req.query);
    success(res, result, req.cacheId);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    bodyRequired(req, [
      "provinceId",
      "districId",
      "regencieId",
      "vilageId",
      "address",
      "name",
      "imageUrl",
      "waNo",
      "phone",
      "latitude",
      "longitude",
    ]);
    let result = await Clinic.createClinic(req.body);
    success(res, result);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

router.post("/operations", async (req, res) => {
  try {
    bodyRequired(req, [
      "clinicId",
      "day",
      "openAt",
      "closeAt",
    ]);
    enumBodyRequired(req, 'day', enumHari);
    let result = await Clinic.createClinicOperations(req.body);
    success(res, result);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

module.exports = router;
