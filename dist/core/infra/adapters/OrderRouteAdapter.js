"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptOrderRoute = void 0;

const adaptOrderRoute = (controller, provider) => {
  return async (request, response, next) => {
    const requestData = { ...request.body,
      ...request.params,
      ...request.query
    };
    const httpResponse = await controller.handle(provider.normalize(requestData));

    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body);
      return next();
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error
      });
    }
  };
};

exports.adaptOrderRoute = adaptOrderRoute;