const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

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
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: 'admin',
    }
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
 * @typedef Blog
 */
const Blog = mongoose.model('Blog', schema);

module.exports = Blog;
