import { Order } from '@prisma/client'

export interface IOrderEventHandler {
    queueTasks(order: Order): Promise<void>
}
