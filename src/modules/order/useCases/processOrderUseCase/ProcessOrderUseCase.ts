import { CheckItemStock } from '@modules/order/events/paid/CheckItemsStock'
import { CheckOrderData } from '@modules/order/events/paid/CheckOrderData'
import { GenerateOrderInvoice } from '@modules/order/events/paid/GenerateOrderInvoice'
import { GenerateOrderLabel } from '@modules/order/events/paid/GenerateOrderLabel'
import { OrderPaidEvent } from '@modules/order/events/paid/handle/OrderPaidEvent'
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'
import { Order, StatusList } from '@prisma/client'

interface IRequest {
    order: Order
}

export class ProcessOrderUseCase {
    constructor(private orderRepository: IOrderRepository) {}

    async execute({ order }: IRequest): Promise<Order> {
        if (order.erpStatus === 'Pedido Pago') {
            const paid = await this.orderRepository.updateOrderStatus(
                order,
                StatusList.PAID
            )

            new OrderPaidEvent(
                new CheckItemStock(),
                new CheckOrderData(),
                new GenerateOrderInvoice(),
                new GenerateOrderLabel()
            ).queueTasks(order)

            return paid
        }

        if (order.erpStatus === 'Pedido Em Separação') {
            const in_separation = await this.orderRepository.updateOrderStatus(
                order,
                StatusList.IN_SEPARATION
            )

            return in_separation
        }

        return order
    }
}
