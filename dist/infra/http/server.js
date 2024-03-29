"use strict";

require("reflect-metadata");

require("express-async-errors");

var _express = _interopRequireDefault(require("express"));

var _AppError = require("../../errors/AppError");

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_routes.routes);
app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});
app.listen(3333, () => console.log('Backend Running in port 3333.'));