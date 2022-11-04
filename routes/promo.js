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
    bodyRequired(req, ['zoneId', "name", "description", 'imageUrl', 'type']);
    enumBodyRequired(req, "type", enumPromoType);
    let result = await Promo.createPromo(req.body);
    success(res, result);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    bodyRequired(req, ['highlight']);
    if (req.body.type) {
      enumBodyRequired(req, "type", enumPromoType);
    }
    let result = await Promo.editPromo({...req.body, id: req.params.id});
    success(res, result);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

router.get("/highlight", cacheQuery("promo"), async (req, res) => {
  try {
    queryRequired(req, ["zoneId"]);
    let result = await Promo.listPromoHighlight(req.query);
    success(res, result, req.cacheId);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

module.exports = router;
