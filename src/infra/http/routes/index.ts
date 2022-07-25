import { Router } from 'express'

import { clientRouter } from './client.routes'
import { orderRouter } from './order.routes'

const routes = Router()

routes.use('/orders', orderRouter)
routes.use('/clients', clientRouter)

export { routes }
