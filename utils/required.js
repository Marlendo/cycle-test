
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

const enumQueryRequired = (req, key, keys = []) => {
    let value = req.query[key];
    if (value) {
        let filtered = keys.filter((e) => e === value);
        if (filtered.length === 0) {
            throw {
                message: `${key} must include ${JSON.stringify(keys)}`
              }
        }
    }
};

const enumBodyRequired = (req, key, keys = []) => {
    let value = req.body[key];
    if (value) {
        let filtered = keys.filter((e) => e === value);
        if (filtered.length === 0) {
            throw {
                message: `${key} must include ${JSON.stringify(keys)}`
              }
        }
    }
};

module.exports = {
    queryRequired,
    bodyRequired,
    enumQueryRequired,
    enumBodyRequired
};
