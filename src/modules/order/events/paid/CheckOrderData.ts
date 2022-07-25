import {
    IOrderEvent,
    IOrderEventJobParams,
    IOrderEventJobResult,
} from '../handler/IOrderEvent'

export class CheckOrderData implements IOrderEvent {
    async execute({
        order,
    }: IOrderEventJobParams): Promise<IOrderEventJobResult> {
        return {
            error: 'CheckOrderData Cannot proccess this task',
        }
    }
}
