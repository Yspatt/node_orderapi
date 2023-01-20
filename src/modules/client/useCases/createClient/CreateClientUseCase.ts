import { IClientReposity } from '@modules/client/repositories/IClientRepository'
import { Client } from '@prisma/client'

type IRequest = {
    id: string
    name: string
    cnpj: string
    ie: string
    rg: string
    phone: string
    cell: string
    email: string
}

export class CreateClientUseCase {
    constructor(private clientRepository: IClientReposity) {}

    async execute({
        cell,
        cnpj,
        email,
        id,
        ie,
        name,
        phone,
        rg,
    }: IRequest): Promise<Client> {
        const client = await this.clientRepository.createClient({
            cell,
            cnpj,
            email,
            id,
            ie,
            name,
            phone,
            rg,
        })
        return client
    }
}
