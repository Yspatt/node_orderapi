"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindOrderUseCase = void 0;

class FindOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({
    number
  }) {
    const order = await this.orderRepository.getOrderByNumber(number);

    if (!order) {
      return null;
    }

    return order;
  }

}

exports.FindOrderUseCase = FindOrderUseCase;