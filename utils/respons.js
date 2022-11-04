const { setCache } = require("./cache");
const { copyObj } = require("./safe");

const success = (res, { data = null, meta = null, message = "Success" }, cacheId = false) => {
  if (cacheId && data) {
    setCache(cacheId, {
      data: copyObj(data),
      meta
    });
  }
  return res.json({
    success: true,
    data: data ? data : null,
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
