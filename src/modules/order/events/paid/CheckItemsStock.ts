import {
    IOrderEvent,
    IOrderEventJobParams,
    IOrderEventJobResult,
} from '../handler/IOrderEvent'

export class CheckItemStock implements IOrderEvent {
    async execute({
        order,
    }: IOrderEventJobParams): Promise<IOrderEventJobResult> {
        return {
            error: 'CheckItemStock Cannot proccess this task.',
        }
    }
}
