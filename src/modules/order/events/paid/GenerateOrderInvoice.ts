import {
    IOrderEvent,
    IOrderEventJobParams,
    IOrderEventJobResult,
} from '../handler/IOrderEvent'

export class GenerateOrderInvoice implements IOrderEvent {
    async execute({
        order,
    }: IOrderEventJobParams): Promise<IOrderEventJobResult> {
        return {
            error: 'GenerateOrderInvoice Cannot proccess this task',
        }
    }
}
