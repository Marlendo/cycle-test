const success = (res, { data = null, meta = null, message = "Success" }) => {
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
