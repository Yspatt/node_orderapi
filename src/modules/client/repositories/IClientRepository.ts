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

export type ClientCreateParams = {
    id: string
    name: string
    cnpj: string
    ie: string
    rg: string
    phone: string
    cell: string
    email: string
}

export interface IClientReposity {
    search({
        query,
        page,
        perPage,
    }: ClientSearchParams): Promise<ClientSearchResult>

    createClient({
        cell,
        cnpj,
        email,
        id,
        ie,
        name,
        phone,
        rg,
    }: ClientCreateParams): Promise<Client>
    getClientById(id: string): Promise<Client>
    getClientByName(name: string): Promise<Client[]>
    getClientByCnpj(cnpj: string): Promise<Client>
    getClientByIdentifier(identifier: number): Promise<Client>
}
