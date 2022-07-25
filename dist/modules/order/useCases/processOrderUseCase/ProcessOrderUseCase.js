"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessOrderUseCase = void 0;

var _client = require("@prisma/client");

class ProcessOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({
    order
  }) {
    if (order.erpStatus === 'Pedido Pago') {
      const paid = await this.orderRepository.updateOrderStatus(order, _client.StatusList.PAID);
      return paid;
    }

    if (order.erpStatus === 'Pedido Em Separação') {
      const in_separation = await this.orderRepository.updateOrderStatus(order, _client.StatusList.IN_SEPARATION);
      return in_separation;
    }

    return order;
  }

}

exports.ProcessOrderUseCase = ProcessOrderUseCase;