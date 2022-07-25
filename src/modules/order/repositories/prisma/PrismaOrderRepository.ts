import { prisma } from '@infra/prisma/client'
import { Order, StatusList } from '@prisma/client'

import { IOrderRepository } from '../IOrderRepository'

export class PrismaOrderRepository implements IOrderRepository {
    async getOrderByNumber(number: number): Promise<Order> {
        const order = await prisma.order.findFirst({
            where: {
                number,
            },
            include: {
                alerts: true,
                client: true,
                invoice: true,
                items: true,
                status: true,
                transport: true,
            },
        })
        return order
    }

    async getOrderByID(id: string): Promise<Order> {
        const order = await prisma.order.findFirst({
            where: {
                id,
            },
        })
        return order
    }

    async getOrderByReference(orderReference: string): Promise<Order> {
        const order = await prisma.order.findFirst({
            where: {
                orderReference,
            },
        })
        return order
    }

    async updateOrderStatus(
        order: Order,
        status: StatusList,
        observations: string
    ): Promise<Order> {
        const update = await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: {
                    connectOrCreate: {
                        create: {
                            id: order.number + status,
                            status: status,
                            observations: observations ?? '',
                            changedAt: new Date(),
                        },
                        where: {
                            id: order.number + status,
                        },
                    },
                },
            },
        })
        return update
    }
}
