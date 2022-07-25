import { Order, StatusList } from '@prisma/client'

export interface IOrderRepository {
    getOrderByNumber(number: Number): Promise<Order>
    getOrderByID(id: String): Promise<Order>
    getOrderByReference(orderReference: String): Promise<Order>

    updateOrderStatus(
        order: Order,
        status: StatusList,
        observations?: string
    ): Promise<Order>
}
