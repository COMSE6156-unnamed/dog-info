const Sequelize = require("sequelize");
const sql = require("./sql/sizes");
const sequelize = require("../util/database");
const errorCheck = require("./utils/errors");
const format = require("./utils/format");
const { Sizes } = require("../models/models");

const getSize = async (req, res) => {
    try {
        const id = req.params.id;
        let sizes = await sequelize.query(sql.getSize, {
            replacements: { id: id },
            type: Sequelize.QueryTypes.SELECT
        })
        if (sizes.length < 1) {
            throw new Error("SIZE_DOES_NOT_EXIST");
        }
        const size = sizes.at(0);
        return res.status(200).json(format.sizeFormat(size));
    } catch (error) {
        console.log(error);
        return errorCheck.errorHandler(error, res);
    }
}

const getSizes = async (req, res) => {
    try {
        const sizes = await Sizes.findAll();
        if (!sizes) {
            throw new Error("LOAD_SIZES_ERROR");
        }
        return res.status(200).json(format.sizesFormat(sizes));
    } catch (error) {
        console.log(error);
        return errorCheck.errorHandler(error, res);
    }
}

const func = {
    getSize,
    getSizes,
}

module.exports = func