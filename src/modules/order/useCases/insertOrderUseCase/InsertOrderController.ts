import { Controller } from '@core/infra/Controller'
import { clientError, fail, HttpResponse, ok } from '@core/infra/HttpResponse'
import { OrderModel } from '@infra/providers/models/erp/IERPOrderProvider'

import { InsertOrderUseCase } from './InsertOrderUseCase'

export class InsertOrderController implements Controller {
    constructor(private insertOrderUseCase: InsertOrderUseCase) {}

    async handle(request: OrderModel): Promise<HttpResponse> {
        try {
            const response = await this.insertOrderUseCase.execute(request)

            if (response == null) {
                return clientError(new Error('An unknow error has appear.'))
            }

            return ok(response)
        } catch (err) {
            console.log(err)
            return fail(err)
        }
    }
}
