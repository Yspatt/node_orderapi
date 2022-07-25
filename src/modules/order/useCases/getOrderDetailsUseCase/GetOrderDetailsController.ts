import { Controller } from '@core/infra/Controller'
import { HttpResponse, fail, ok, clientError } from '@core/infra/HttpResponse'

import { GetOrderDetailsUseCase } from './GetOrderDetailsUseCase'

type GetOrderDetailsControllerRequest = {
    number: string
}

export class GetOrderDetailsController implements Controller {
    constructor(private getOrderDetailsUseCase: GetOrderDetailsUseCase) {}

    async handle({
        number,
    }: GetOrderDetailsControllerRequest): Promise<HttpResponse> {
        try {
            const result = await this.getOrderDetailsUseCase.execute({
                number: Number(number),
            })

            if (!result) {
                return clientError(new Error('Internal Client Error.'))
            } else {
                return ok(result)
            }
        } catch (err) {
            return fail(err)
        }
    }
}
