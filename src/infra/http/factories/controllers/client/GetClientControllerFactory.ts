import { Controller } from '@core/infra/Controller'
import { PrismaClientRepository } from '@modules/client/repositories/prisma/PrismaClientRepository'
import { GetClientController } from '@modules/client/useCases/getClient/GetClientController'
import { GetClientUseCase } from '@modules/client/useCases/getClient/GetClientUseCase'

export function makeGetClientController(): Controller {
    const clientRepository = new PrismaClientRepository()
    const getClientUseCase = new GetClientUseCase(clientRepository)
    const getClientController = new GetClientController(getClientUseCase)

    return getClientController
}
