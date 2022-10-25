const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const DogFromOrigins = sequelize.define("dogFromOrigins", {
    did: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    oid: {
        type: Sequelize.BIGINT,
        primaryKey: true
    }
})

module.exports = DogFromOrigins