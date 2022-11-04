const express = require('express');
const clinicController = require('../../controllers/clinic.controller');

const router = express.Router();

router
  .route('/')
  .get(clinicController.getClinic)
  .post(clinicController.createClinic)

module.exports = router;