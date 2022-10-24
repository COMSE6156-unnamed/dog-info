const Sequelize = require("sequelize");
const sql = require("./sql/dogs");
const sequelize = require("../util/database");
const format = require("./utils/format");
const errorCheck = require("./utils/errors");

const getAllDogsInfo = async (req, res) => {
    try {
        let dogs = await sequelize.query(sql.getDogs,
            { type: Sequelize.QueryTypes.SELECT });
        const categories = await sequelize.query(sql.getDogsCategories,
            { type: Sequelize.QueryTypes.SELECT });
        const origins = await sequelize.query(sql.getDogsOrigins,
            { type: Sequelize.QueryTypes.SELECT });
        
        const categoryMap = new Map();
        if (!dogs || !categories || !origins) {
            throw new Error("LOAD_DOGS_ERROR");
        }
        categories.forEach((category) => {
            if (!categoryMap.has(category.did)) {
                categoryMap.set(category.did, []);
            }
            categoryMap.get(category.did).push({id: category.cid, name: category.cname});
        });

        const originMap = new Map();
        origins.forEach((origin) => {
            if (!originMap.has(origin.did)) {
                originMap.set(origin.did, []);
            }
            originMap.get(origin.did).push({id: origin.oid, name: origin.oname});
        });

        dogs = format.dogsFormat(dogs, categoryMap, originMap);
        return res.status(200).json(dogs);
    } catch (error) {
        console.log(error);
        return errorCheck.errorHandler(error, res);    
    }
};

const getDog = async (req, res) => {
    try {
        const id = req.params.id;
        const dogs = await sequelize.query(sql.getDog, {
            replacements: {
                id: id
            },
            type: Sequelize.QueryTypes.SELECT
        });
        console.log("dogs", dogs);
        if (dogs.length < 1) {
            throw new Error("DOG_NOT_EXIST");
        }
        
        let dog = dogs.at(0);
        const categories = await sequelize.query(sql.getDogCategories, {
            replacements: { id: id },
            type: Sequelize.QueryTypes.SELECT
        });
        
        const origins = await sequelize.query(sql.getDogOrigins, {
            replacements: { id: id },
            type: Sequelize.QueryTypes.SELECT
        });
        
        dog = format.dogFormat(dog, categories, origins);
        return res.status(200).json(dog);
    } catch (error) {
        console.log(error);
        return errorCheck.errorHandler(error, res);    
    }
};

const func = {
    getAllDogsInfo,
    getDog
}

module.exports = func;