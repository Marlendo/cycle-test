const express = require("express");
const { cacheQuery } = require("../middlewares/cache");
const router = express.Router();
const Promo = require("../services/promo");
const { enumQueryRequired, queryRequired, bodyRequired, enumBodyRequired } = require("../utils/required");
const { success, failed } = require("../utils/respons");
const enumPromoType = require("../constant/enumPromoType.json");

router.get("/", cacheQuery("promo"), async (req, res) => {
  try {
    queryRequired(req, ["zoneId", "type"]);
    enumQueryRequired(req, "type", enumPromoType);
    let result = await Promo.listPromo(req.query);
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
    bodyRequired(req, ['zoneId', "title", "desc", 'image', 'type']);
    enumBodyRequired(req, "type", enumPromoType);
    let result = await Promo.listPromo(req.body);
    success(res, result, req.cacheId);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

module.exports = router;
