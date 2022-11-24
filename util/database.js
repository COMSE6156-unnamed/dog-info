const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize(
    "dog_data",
    "dbuser",
    "dbuserdbuser",
    {
        dialect: "mysql",
        host: "localhost",
        port: "3306",
        logging: console.log,
        dialectOptions: {
            require: true,
            rejectUnauthorized: false
        },

        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        }
    }
)

module.exports = sequelize;