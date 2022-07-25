import { Request, Response } from 'express'

import { IERPOrderProvider } from '@infra/providers/models/erp/IERPOrderProvider'

import { Controller } from '../Controller'

export const adaptOrderRoute = (
    controller: Controller,
    provider: IERPOrderProvider
) => {
    return async (request: Request, response: Response) => {
        const requestData = {
            ...request.body,
            ...request.params,
            ...request.query,
        }

        const httpResponse = await controller.handle(
            provider.normalize(requestData)
        )

        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            return response
                .status(httpResponse.statusCode)
                .json(httpResponse.body)
        } else {
            return response.status(httpResponse.statusCode).json({
                error: httpResponse.body.error,
            })
        }
    }
}
