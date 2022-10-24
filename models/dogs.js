const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const Dogs = sequelize.define("dogs", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pronunciation_url: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Dogs