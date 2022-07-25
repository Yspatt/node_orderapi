import axios from 'axios'

import { prisma } from '@infra/prisma/client'
import { StatusList } from '@prisma/client'

import {
    IOrderEvent,
    IOrderEventJobParams,
    IOrderEventJobResult,
} from '../handler/IOrderEvent'

export class GenerateOrderLabel implements IOrderEvent {
    async execute({
        order,
    }: IOrderEventJobParams): Promise<IOrderEventJobResult> {
        const origin = order.integrationType

        // eslint-disable-next-line no-async-promise-executor
        const label = new Promise(async (resolve, reject) => {
            if (origin.includes('Shopee')) {
                const label = await axios.get(
                    `http://localhost:6080/label/shopee?order=${order.orderReference}&shop_id=571326888`
                )

                resolve(label.data)
            }

            if (origin.includes('Mercado') && origin.includes('Livre')) {
                const label = await axios.post(
                    `http://localhost:7879/shipment/details`,
                    {
                        shipment: order.orderReference,
                    }
                )
                if (label.data.status && label.data.status === 404) {
                    reject(label.data.message)
                }
                resolve(label.data)
            }
        })

        await label.then(async (label) => {
            await prisma.order.update({
                where: {
                    id: order.id,
                },
                data: {
                    label: label,
                    status: {
                        create: {
                            id: order.number + StatusList.LABEL_ATTACHED,
                            status: StatusList.LABEL_ATTACHED,
                            observations: 'Order Attached Successfully',
                            changedAt: new Date(),
                        },
                    },
                },
            })
        })

        if (await label.catch()) {
            return {
                error: 'Invalid order Label',
            }
        } else {
            return {
                success: 'Successfully created label!',
            }
        }
    }
}
