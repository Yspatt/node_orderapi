import { injectable } from 'tsyringe'

import prisma from '@infra/prisma/client'
import { OrderModel } from '@infra/providers/models/erp/IERPOrderProvider'
import { CreateClientUseCase } from '@modules/client/useCases/createClient/CreateClientUseCase'
import { GetClientUseCase } from '@modules/client/useCases/getClient/GetClientUseCase'
import { Order, StatusList } from '@prisma/client'

import { ProcessOrderUseCase } from '../processOrderUseCase/ProcessOrderUseCase'

@injectable()
export class InsertOrderUseCase {
    constructor(
        private processOrderUseCase: ProcessOrderUseCase,
        private getClient: GetClientUseCase,
        private createClient: CreateClientUseCase
    ) {}

    async execute(model: OrderModel): Promise<Order> {
        const data = await model

        let client = await this.getClient.execute({
            id: data.client.id,
        })

        if (!client) {
            client = await this.createClient.execute({
                cell: data.client.cell,
                cnpj: data.client.cnpj,
                email: data.client.email,
                id: data.client.id,
                ie: data.client.ie,
                name: data.client.name,
                phone: data.client.phone,
                rg: data.client.rg,
            })
        }

        const upsert = await prisma.order.upsert({
            where: {
                erpNumber: data.erpNumber,
            },
            create: {
                erpNumber: data.erpNumber,
                erpStatus: data.erpStatus,
                shopNumber: data.shopNumber,
                shop: data.shop,
                date: data.date,
                discounts: data.discounts,
                totalShipping: data.totalShipping,
                totalProducts: data.totalProducts,
                totalOrder: data.totalOrder,
                observations: data.observations,
                internalObservations: data.internalObservations,

                integrationType: data.integrationType,

                client: {
                    connect: {
                        where: {
                            internalId: data.client.id,
                        },
                    },
                },
                invoiceAccessKey: data.invoiceAccessKey,
                invoiceNumber: data.invoiceNumber,
                invoiceSerie: data.invoiceSerie,
                transport: data.transport,
                trackingCode: data.trackingCode,

                items: {
                    create: data.items,
                },
                status: {
                    create: {
                        id: data.erpNumber + '_' + StatusList.PENDING,
                        status: StatusList.PENDING,
                        observations: '',
                        changedAt: new Date(),
                    },
                },
            },
            update: {
                erpStatus: data.erpStatus,
                integrationType: data.integrationType,
                observations: data.observations,
                internalObservations: data.internalObservations,
            },
        })
        console.log('sucess')

        if (upsert) {
            await this.processOrderUseCase.execute({
                order: upsert,
            })
            return upsert
        } else {
            return null
        }
    }
}
