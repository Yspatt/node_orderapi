import { Order } from '@prisma/client'

export interface IOrderEventJobResult {
    error?: any
    success?: any
}

export interface IOrderEventJobParams {
    order: Order
}

export interface IOrderEvent {
    execute(params: IOrderEventJobParams): Promise<IOrderEventJobResult>
}
