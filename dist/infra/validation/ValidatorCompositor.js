"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidatorCompositor = void 0;

class ValidatorCompositor {
  constructor(validators) {
    this.validators = validators;
  }

  validate(input) {
    for (const validator of this.validators) {
      const error = validator.validate(input);
      if (error !== null) return error;
    }

    return null;
  }

}

exports.ValidatorCompositor = ValidatorCompositor;