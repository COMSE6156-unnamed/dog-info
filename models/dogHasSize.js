const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const DogHasSize = sequelize.define("dogHasSize", {
    did: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    sid: {
        type: Sequelize.BIGINT,
        primaryKey: true
    }
})

module.exports = DogHasSize