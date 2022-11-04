const { setCache } = require("./cache");

const success = (res, { data = null, meta = null, message = "Success" }, cacheId = false) => {
  if (cacheId && data) {
    setCache(cacheId, data);
  }
  return res.json({
    success: true,
    data,
    meta,
    message,
  });
};

const failed = (res, { data = null, meta = null, message = "Failed" }) => {
  return res.json({
    success: false,
    data,
    meta,
    message,
  });
};

module.exports = {
  success,
  failed
};
