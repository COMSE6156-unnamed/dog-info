const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const Origins = sequelize.define("origins", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Origins