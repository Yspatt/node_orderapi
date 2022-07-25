import { Order } from '@prisma/client'

export interface IShopeeGetLabel {
    getLabel(order: Order): Promise<String>
}
