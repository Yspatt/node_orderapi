import express from 'express'

import { adaptRoute } from '@core/infra/adapers/ExpressRouteAdapter'

import { makeGetClientController } from '../factories/controllers/client/GetClientControllerFactory'
import { makeSearchClientController } from '../factories/controllers/client/SearchClientControllerFactory'

const clientRouter = express.Router()

clientRouter.get('/search', adaptRoute(makeSearchClientController()))
clientRouter.get('/:id', adaptRoute(makeGetClientController()))

export { clientRouter }
