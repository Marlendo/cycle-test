const mapSafe = (fn, defaultVal) => {
  try {
    return fn();
  } catch (_e) {
    return defaultVal;
  }
};

const copyObj = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.error(error);
    return obj;
  }
}

module.exports = {
  mapSafe,
  copyObj
};