import { Client } from '@prisma/client'

export type ClientSearchParams = {
    query?: string
    page: number
    perPage: number
}

export type ClientSearchResult = {
    data: Client[]
    totalCount: number
}

export interface IClientReposity {
    search({
        query,
        page,
        perPage,
    }: ClientSearchParams): Promise<ClientSearchResult>
    getClientById(id: string): Promise<Client>
    getClientByName(name: string): Promise<Client[]>
    getClientByCnpj(cnpj: string): Promise<Client>
    getClientByIdentifier(identifier: number): Promise<Client>
}
