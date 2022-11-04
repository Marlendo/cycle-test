const express = require("express");
const router = express.Router();
const Location = require("../services/location");

router.get("/", async (req, res) => {
  try {
    let result = await Location.findLocation({
      lat: req.body.lat,
      long: req.body.lat,
    });
    res.json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
});

module.exports = router;
