import { Controller } from '@core/infra/Controller'
import { HttpResponse, fail, ok, clientError } from '@core/infra/HttpResponse'

import { GetClientUseCase } from './GetClientUseCase'

type GetClientControllerRequest = {
    id: string
}

export class GetClientController implements Controller {
    constructor(private getClientUseCase: GetClientUseCase) {}

    async handle(params: GetClientControllerRequest): Promise<HttpResponse> {
        try {
            const result = await this.getClientUseCase.execute({
                id: params.id,
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
