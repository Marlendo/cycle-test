const NodeCache = require( "node-cache" );
const cache = new NodeCache({ stdTTL: 3600 });

const getCache = (cacheId) => {
  try {
    return cache.get(cacheId);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const setCache = (cacheId, data) => {
  try {
    cache.set(cacheId, data);
  } catch (error) {
    console.error(error);
  }
};

const deleteCache = (cacheSlug) => {
  try {
    let keys = cache.keys();
    let search = new RegExp(cacheSlug , 'i'); // prepare a regex object
    let keysDeleted = keys.filter(item => search.test(item));
    if (keysDeleted && keysDeleted.length > 0) {
      cache.del(keysDeleted);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getCache,
  setCache,
  deleteCache
};