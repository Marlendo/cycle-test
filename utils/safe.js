const mapSafe = (fn, defaultVal) => {
  try {
    return fn();
  } catch (_e) {
    return defaultVal;
  }
};

module.exports = {
  mapSafe
};