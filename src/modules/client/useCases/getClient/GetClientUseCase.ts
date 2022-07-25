import { IClientReposity } from '@modules/client/repositories/IClientRepository'
import { Client } from '@prisma/client'

type IRequest = {
    id: string
}

export class GetClientUseCase {
    constructor(private clientRepository: IClientReposity) {}

    async execute(params: IRequest): Promise<Client> {
        const client = await this.clientRepository.getClientById(params.id)
        return client
    }
}
