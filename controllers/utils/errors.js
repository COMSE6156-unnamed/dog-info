const validator = require("validator");
const errors = new Map([
    ["DOG_NOT_EXIST", "Dog does not exist"],
    ["LOAD_DOGS_ERROR", "Error loading info of all dogs"],
    ["CATEGORY_NOT_EXIST", "Category does not exist"],
    ["LOAD_CATEGORIES_ERROR", "Error loading list of all categories"],
    ["ORIGIN_NOT_EXIST", "Origin does not exist"],
    ["LOAD_ORIGINS_ERROR", "Error loading list of origins"]
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
        return res.status(500).json({ error: { message: err.message } });
    }
};

const func = {
    errors,
    errorHandler
};

module.exports = func;