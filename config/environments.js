const path = require("path");
const bodyParser = require("body-parser");

module.exports = function (app, express) {

  app.set('view engine', 'ejs')

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });


};
