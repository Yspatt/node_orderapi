import { prisma } from '@infra/prisma/client'
import { Client } from '@prisma/client'

import {
    ClientSearchParams,
    ClientSearchResult,
    IClientReposity,
} from '../IClientRepository'

export class PrismaClientRepository implements IClientReposity {
    async search({
        query,
        page,
        perPage,
    }: ClientSearchParams): Promise<ClientSearchResult> {
        const queryPayload = {
            take: Number(perPage),
            skip: (page - 1) * perPage,
            where: {},
        }

        if (query) {
            queryPayload.where = {
                name: { contains: query, mode: 'insensitive' },
            }
        }

        const clients = await prisma.client.findMany({
            ...queryPayload,
            orderBy: {
                name: 'asc',
            },
        })

        const estimatedCount = await prisma.client.aggregate({
            _count: true,
            where: queryPayload.where,
        })

        return {
            data: clients,
            totalCount: estimatedCount._count,
        }
    }

    async getClientById(id: string): Promise<Client> {
        const client = await prisma.client.findFirst({
            where: {
                id,
            },
            include: {
                Order: true,
            },
        })
        return client
    }

    getClientByName(name: string): Promise<Client[]> {
        throw new Error('Method not implemented.')
    }

    getClientByCnpj(cnpj: string): Promise<Client> {
        throw new Error('Method not implemented.')
    }

    getClientByIdentifier(identifier: number): Promise<Client> {
        throw new Error('Method not implemented.')
    }
}
