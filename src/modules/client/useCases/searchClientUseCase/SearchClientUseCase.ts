import {
    ClientSearchResult,
    IClientReposity,
} from '@modules/client/repositories/IClientRepository'

type IRequest = {
    page: number
    perPage: number
    query: string
}

export class SearchClientUseCase {
    constructor(private clientRepository: IClientReposity) {}

    async execute(params: IRequest): Promise<ClientSearchResult | Error> {
        if (isNaN(params.page) || isNaN(params.perPage)) {
            return new Error('Invalid page ou perPage number')
        }
        const search = await this.clientRepository.search({
            page: params.page,
            perPage: params.perPage,
            query: params.query,
        })
        return search
    }
}
