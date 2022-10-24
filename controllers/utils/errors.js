const validator = require("validator");
const errors = new Map([
    ["DOG_NOT_EXIST", "Dog does not exist"],
    ["LOAD_DOGS_ERROR", "Error loading info of all dogs"]
])

const errorHandler = (err, res) => {
    if (err.type) {
        return res.status(200).json({ error: { message: err.message } });
    } else if (errors.has(err.message)) {
        return res
            .status(200)
            .json({
                error: { message: errors.get(err.message) }
            });
    } else {
        return res.status(500).json({ error: { message: "server error" } });
    }
};

const func = {
    errors,
    errorHandler
};

module.exports = func;