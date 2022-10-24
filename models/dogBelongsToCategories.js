const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const DogBelongsToCategories = sequelize.define("dogBelongsToCategories", {
    did: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    cid: {
        type: Sequelize.BIGINT,
        primaryKey: true
    }
})

module.exports = DogBelongsToCategories