import { IOrderNotification } from '@infra/providers/models/notification/IOrderNotification'

export class SlackOrderNotification implements IOrderNotification {
    sendNotification() {
        throw new Error('Method not implemented.')
    }
}
