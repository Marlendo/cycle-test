const express = require('express');
const promoController = require('../../controllers/promo.controller');

const router = express.Router();

router
  .route('/')
  .get(promoController.getPromo)
  .post(promoController.createPromo)

router
  .route('/slider')
  .get(promoController.getPromoSlider)

module.exports = router;