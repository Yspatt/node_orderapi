"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindOrderController = void 0;

var _tsyringe = require("tsyringe");

var _HttpResponse = require("../../../../core/infra/HttpResponse");

var _FindOrderUseCase = require("./FindOrderUseCase");

class FindOrderController {
  async handle(request) {
    try {
      const findOrderUseCase = _tsyringe.container.resolve(_FindOrderUseCase.FindOrderUseCase);

      const response = await findOrderUseCase.execute(request);

      if (response == null) {
        return (0, _HttpResponse.notFound)(new Error('This order doest not exists'));
      }

      return (0, _HttpResponse.ok)(response);
    } catch (err) {
      return (0, _HttpResponse.fail)(err);
    }
  }

}

exports.FindOrderController = FindOrderController;