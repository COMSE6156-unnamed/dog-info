const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize(
    // process.env.DATABASE,
    // process.env.DATABASE_USER,
    // process.env.DATABASE_PASSWORD,
    "dog_data",
    "dbuser",
    "dbuserdbuser",
    {
        dialect: "mysql",
        // host: process.env.DATABASE_HOST,
        // port: process.env.DATABASE_PORT,
        host: "localhost",
        port: 3306,
        logging: console.log,
        // dialectOptions: {
        //     ssl: 'Amazon RDS',
        // },
        dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },

        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        }
    }
)

module.exports = sequelize;