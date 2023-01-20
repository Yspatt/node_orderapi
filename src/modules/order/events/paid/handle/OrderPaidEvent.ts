import prisma from '@infra/prisma/client'
import { Order } from '@prisma/client'

import { IOrderEvent } from '../../handler/IOrderEvent'
import { IOrderEventHandler } from '../../handler/IOrderEventHandler'
import { CheckItemStock } from '../CheckItemsStock'
import { CheckOrderData } from '../CheckOrderData'
import { GenerateOrderInvoice } from '../GenerateOrderInvoice'
import { GenerateOrderLabel } from '../GenerateOrderLabel'

export class OrderPaidEvent implements IOrderEventHandler {
    public jobs: IOrderEvent[] = []

    constructor(
        private checkItemStock: CheckItemStock,
        private checkOrderData: CheckOrderData,
        private generateOrderInvoice: GenerateOrderInvoice,
        private generateOrderLabel: GenerateOrderLabel
    ) {
        this.jobs.push(
            checkItemStock,
            checkOrderData,
            generateOrderInvoice,
            generateOrderLabel
        )
    }

    async queueTasks(order: Order): Promise<void> {
        const results = []
        await this.jobs.forEach(async (element) => {
            const execute = await element.execute({ order })
            results.push({ message: execute.error })
        })

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                alerts: {
                    createMany: {
                        data: results,
                    },
                },
            },
        })
        return null
    }
}
