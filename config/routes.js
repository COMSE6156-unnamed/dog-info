const initRouter = require("../routes/init");
const dogRouter = require("../routes/dogs");
const categoryRouter = require("../routes/categories");
const originRouter = require("../routes/origins");
const sizeRouter = require("../routes/sizes");
const createError = require("http-errors");

module.exports = function (app) {
    
  app.use("/dogs", dogRouter);
  app.use("/categories", categoryRouter);
  app.use("/origins", originRouter);
  app.use("/sizes", sizeRouter);
  app.use("/", initRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    })
    // res.render("error");
  });
};
