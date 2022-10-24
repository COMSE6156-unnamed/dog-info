const Sequelize = require("sequelize");
const sql = require("./sql/categories");
const sequelize = require("../util/database");
const errorCheck = require("./utils/errors");
const format = require("./utils/format");
const { Categories } = require("../models/models");
const getCategory = async (req, res) => {
    try {
        const id = req.params.id;
        let categories = await sequelize.query(sql.getCategory, {
            replacements: { id : id },
            type: Sequelize.QueryTypes.SELECT
        })
        if (categories.length < 1) {
            throw new Error("CATEGORY_NOT_EXIST");
        }
        let category = categories.at(0);
        return res.status(200).json(format.categoryFormat(category));
    } catch (error) {
        console.log(error);
        return errorCheck.errorHandler(error, res);
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        if (!categories) {
            throw new Error("LOAD_CATEGORIES_ERROR");
        }
        return res.status(200).json(format.categoriesFormat(categories));
    } catch (error) {
        console.log(error);
        return errorCheck.errorHandler(error, res);
    }
}

const func = {
    getCategory,
    getCategories
}

module.exports = func;