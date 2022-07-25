import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'
import { Order } from '@prisma/client'

type IRequest = {
    number: number
}

export class GetOrderDetailsUseCase {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(params: IRequest): Promise<Order> {
        const order = await this.orderRepository.getOrderByNumber(params.number)
        return order
    }
}
