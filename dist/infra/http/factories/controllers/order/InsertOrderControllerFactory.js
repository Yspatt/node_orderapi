"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeInsertOrderController = makeInsertOrderController;

var _PrismaOrderRepository = require("../../../../../modules/order/repositories/prisma/PrismaOrderRepository");

var _InsertOrderController = require("../../../../../modules/order/useCases/insertOrderUseCase/InsertOrderController");

var _InsertOrderUseCase = require("../../../../../modules/order/useCases/insertOrderUseCase/InsertOrderUseCase");

var _ProcessOrderUseCase = require("../../../../../modules/order/useCases/processOrderUseCase/ProcessOrderUseCase");

function makeInsertOrderController() {
  const orderRepository = new _PrismaOrderRepository.PrismaOrderRepository();
  const processOrderUseCase = new _ProcessOrderUseCase.ProcessOrderUseCase(orderRepository);
  const insertOrderUseCase = new _InsertOrderUseCase.InsertOrderUseCase(processOrderUseCase);
  const insertOrderController = new _InsertOrderController.InsertOrderController(insertOrderUseCase);
  return insertOrderController;
}