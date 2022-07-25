import { Controller } from '@core/infra/Controller'
import { PrismaOrderRepository } from '@modules/order/repositories/prisma/PrismaOrderRepository'
import { GetOrderDetailsController } from '@modules/order/useCases/getOrderDetailsUseCase/GetOrderDetailsController'
import { GetOrderDetailsUseCase } from '@modules/order/useCases/getOrderDetailsUseCase/GetOrderDetailsUseCase'

export function makeGetOrderDetailsController(): Controller {
    const prismaOrderRepository = new PrismaOrderRepository()
    const getOrderDetails = new GetOrderDetailsUseCase(prismaOrderRepository)
    const getOrderDetailsController = new GetOrderDetailsController(
        getOrderDetails
    )

    return getOrderDetailsController
}
