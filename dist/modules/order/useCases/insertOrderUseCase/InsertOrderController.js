"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InsertOrderController = void 0;

var _HttpResponse = require("../../../../core/infra/HttpResponse");

class InsertOrderController {
  constructor(insertOrderUseCase) {
    this.insertOrderUseCase = insertOrderUseCase;
  }

  async handle(request) {
    try {
      const response = await this.insertOrderUseCase.execute(request);

      if (response == null) {
        return (0, _HttpResponse.clientError)(new Error('An unknow error has appear.'));
      }

      return (0, _HttpResponse.created)(response);
    } catch (err) {
      console.log(err);
      return (0, _HttpResponse.fail)(err);
    }
  }

}

exports.InsertOrderController = InsertOrderController;