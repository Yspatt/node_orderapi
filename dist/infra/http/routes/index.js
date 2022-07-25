"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _express = require("express");

var _order = require("./order.routes");

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use('/orders', _order.orderRouter);