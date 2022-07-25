import { Controller } from '@core/infra/Controller'
import { PrismaClientRepository } from '@modules/client/repositories/prisma/PrismaClientRepository'
import { SearchClientController } from '@modules/client/useCases/searchClientUseCase/SearchClientController'
import { SearchClientUseCase } from '@modules/client/useCases/searchClientUseCase/SearchClientUseCase'

export function makeSearchClientController(): Controller {
    const clientRepository = new PrismaClientRepository()
    const searchClient = new SearchClientUseCase(clientRepository)
    const searchClientController = new SearchClientController(searchClient)

    return searchClientController
}
