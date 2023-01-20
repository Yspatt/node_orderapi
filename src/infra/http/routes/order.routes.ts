import express from 'express'

import { adaptOrderRoute } from '@core/infra/adapers/ExpressOrderRouteAdapter'
import { adaptRoute } from '@core/infra/adapers/ExpressRouteAdapter'
import { BlingAndPluggtoOrderProvider } from '@infra/providers/implementations/erp/BlingAndPluggtoOrderProvider'

import { makeGetOrderDetailsController } from '../factories/controllers/order/GetOrderDetailsControllerFactory'
import { makeInsertOrderController } from '../factories/controllers/order/InsertOrderControllerFactory'

const orderRouter = express.Router()

orderRouter.post(
    '/bling',
    adaptOrderRoute(
        makeInsertOrderController(),
        new BlingAndPluggtoOrderProvider()
    )
)

orderRouter.get('/details/:number', adaptRoute(makeGetOrderDetailsController()))

export { orderRouter }
