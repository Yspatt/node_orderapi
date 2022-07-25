"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrismaOrderRepository = void 0;

var _client = require("../../../../infra/prisma/client");

class PrismaOrderRepository {
  async getOrderByNumber(number) {
    const order = await _client.prisma.order.findFirst({
      where: {
        number
      }
    });
    return order;
  }

  async getOrderByID(id) {
    const order = await _client.prisma.order.findFirst({
      where: {
        id
      }
    });
    return order;
  }

  async getOrderByReference(orderReference) {
    const order = await _client.prisma.order.findFirst({
      where: {
        orderReference
      }
    });
    return order;
  }

  async updateOrderStatus(order, status, observations) {
    const update = await _client.prisma.order.update({
      where: {
        id: order.id
      },
      data: {
        status: {
          connectOrCreate: {
            create: {
              id: order.number + status,
              status: status,
              observations: observations ?? '',
              changedAt: new Date()
            },
            where: {
              id: order.number + status
            }
          }
        }
      }
    });
    return update;
  }

}

exports.PrismaOrderRepository = PrismaOrderRepository;