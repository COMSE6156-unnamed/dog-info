const http = require("http");
const sequelize = require("../util/database");

module.exports = function (app) {
  const server = http.createServer(app);
  sequelize
    .sync()
    .then(() => {
      const httpServer = server.listen(
        { port: process.env.PORT || 3000},
        () => {
          `Server read at http://localhost:${process.env.PORT || 3000}`
        }
      )
    })
    .catch((err) => {
      console.log(err);
    });
};
