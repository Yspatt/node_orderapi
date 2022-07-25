import { Controller } from '@core/infra/Controller'
import { HttpResponse, fail, ok } from '@core/infra/HttpResponse'

import { SearchClientUseCase } from './SearchClientUseCase'

type SearchClientControllerRequest = {
    page: number
    perPage: number
    query: string
}

export class SearchClientController implements Controller {
    constructor(private searchClient: SearchClientUseCase) {}

    async handle(params: SearchClientControllerRequest): Promise<HttpResponse> {
        try {
            const result = await this.searchClient.execute({
                page: params.page,
                perPage: params.perPage,
                query: params.query,
            })

            if (result instanceof Error) {
                return fail(result)
            } else {
                return ok(result)
            }
        } catch (err) {
            return fail(err)
        }
    }
}
