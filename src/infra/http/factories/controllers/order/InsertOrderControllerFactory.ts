import { Controller } from '@core/infra/Controller'
import { PrismaOrderRepository } from '@modules/order/repositories/prisma/PrismaOrderRepository'
import { InsertOrderController } from '@modules/order/useCases/insertOrderUseCase/InsertOrderController'
import { InsertOrderUseCase } from '@modules/order/useCases/insertOrderUseCase/InsertOrderUseCase'
import { ProcessOrderUseCase } from '@modules/order/useCases/processOrderUseCase/ProcessOrderUseCase'

export function makeInsertOrderController(): Controller {
    const orderRepository = new PrismaOrderRepository()
    const processOrderUseCase = new ProcessOrderUseCase(orderRepository)
    const insertOrderUseCase = new InsertOrderUseCase(processOrderUseCase)
    const insertOrderController = new InsertOrderController(insertOrderUseCase)

    return insertOrderController
}
