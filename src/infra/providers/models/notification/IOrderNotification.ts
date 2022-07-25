import { Order } from '@prisma/client'

export interface IOrderNotification {
    sendNotification(order: Order)
}
