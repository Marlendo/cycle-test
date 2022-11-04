const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    googleMapsUrl: {
      type: String,
      required: true,
    },
    openSchedule: {
      type: Object,
      required: true,
    },
    whatsapp: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add index for searching
schema.index({ name: 'text' });
// add plugin that converts mongoose to json
schema.plugin(toJSON);
schema.plugin(paginate);

/**
 * @typedef Clinic
 */
const Clinic = mongoose.model('Clinic', schema);

module.exports = Clinic;
