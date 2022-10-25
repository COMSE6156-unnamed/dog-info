const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const Sizes = sequelize.define("sizes", {
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

module.exports = Sizes