const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
      lowercase: true,
      default: 'perawatan'
    },
    priority: {
      type: Number,
      default: 999,
    },
  },
  {
    timestamps: true,
  }
);

// add index for searching
schema.index({ title: 'text' });
// add plugin that converts mongoose to json
schema.plugin(toJSON);
schema.plugin(paginate);

/**
 * @typedef Promo
 */
const Promo = mongoose.model('Promo', schema);

module.exports = Promo;
