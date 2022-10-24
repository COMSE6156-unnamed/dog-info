const Sequelize = require("sequelize");
const sql = require("./sql/origins");
const sequelize = require("../util/database");
const errorCheck = require("./utils/errors");
const format = require("./utils/format");
const { Origins } = require("../models/models");

const getOrigin = async (req, res) => {
    try {
        const id = req.params.id;
        let origins = await sequelize.query(sql.getOrigin, {
            replacements: { id: id },
            type: Sequelize.QueryTypes.SELECT
        })
        if (origins.length < 1) {
            throw new Error("ORIGIN_NOT_EXIST");
        }
        const origin = origins.at(0);
        return res.status(200).json(format.originFormat(origin));
    } catch (error) {
        console.log(error);
        return errorCheck.errorHandler(error, res);
    }
}

const getOrigins = async (req, res) => {
    try {
        const origins = await Origins.findAll();
        if (!origins) {
            throw new Error("LOAD_ORIGINS_ERROR");
        }
        return res.status(200).json(format.originsFormat(origins));
    } catch (error) {
        console.log(error);
        return errorCheck.errorHandler(error, res);
    }
}

const func = {
    getOrigin,
    getOrigins
}

module.exports = func