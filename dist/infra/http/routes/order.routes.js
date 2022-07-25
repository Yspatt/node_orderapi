"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _OrderRouteAdapter = require("../../../core/infra/adapters/OrderRouteAdapter");

var _BlingOrderProvider = require("../../providers/implementations/erp/BlingOrderProvider");

var _InsertOrderControllerFactory = require("../factories/controllers/order/InsertOrderControllerFactory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRouter = _express.default.Router();

exports.orderRouter = orderRouter;
orderRouter.post('/bling', (0, _OrderRouteAdapter.adaptOrderRoute)((0, _InsertOrderControllerFactory.makeInsertOrderController)(), new _BlingOrderProvider.BlingOrderProvider()));