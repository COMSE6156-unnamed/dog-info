const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const Categories = sequelize.define("categories", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Categories