const { getCache } = require('../utils/cache');
const { success } = require('../utils/respons');
const { mapSafe } = require('../utils/safe');

const cacheQuery = cacheId => {
  return (req, res, next) => {
    let newCacheId = `${cacheId}_${Buffer.from(JSON.stringify(mapSafe(() => req.query, ''))).toString("base64")}`;
    let data = getCache(newCacheId);
    if (data) {
      return success(res, data); 
    }
    req.cacheId = newCacheId;
    return next();
  };
};

module.exports = {
  cacheQuery,
};
