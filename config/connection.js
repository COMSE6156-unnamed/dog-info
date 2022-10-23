const http = require("http");

module.exports = function (app) {
  const server = http.createServer(app);

  const httpServer = server.listen(
    {
      port: process.env.PORT || 3000,
    },
    () => {
      console.log(
        `Server read at http://localhost:${process.env.PORT || 3000}`
      );
    }
  );
};
