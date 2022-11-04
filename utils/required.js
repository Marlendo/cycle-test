
const queryRequired = (req, keys = []) => {
    for (let key of keys) {
        if (!req.query[key]) {
            throw {
                message: `${key} required`
              }
        }
    }
};

const bodyRequired = (req, keys = []) => {
    for (let key of keys) {
        if (!req.body[key]) {
            throw {
                message: `${key} required`
              }
        }
    }
};

module.exports = {
    queryRequired,
    bodyRequired
};
