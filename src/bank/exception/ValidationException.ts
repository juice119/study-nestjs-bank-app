import { BankAppHttpException } from './BankAppHttpException';
import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BankAppHttpException {
  constructor(httpStatus: HttpStatus, errorMessage: string, data: object) {
    super(httpStatus, errorMessage, data);
  }

  static byValidationPipeError(validationErrors: ValidationError[]) {
    const data = {};

    validationErrors.forEach((validationError) => {
      data[validationError.property] = {};
      data[validationError.property].constraintsMessage = Object.values(
        validationError.constraints,
      );
      data[validationError.property].value = validationError.value;
    });

    return new ValidationException(
      HttpStatus.BAD_REQUEST,
      '입력 값에 문제가 있습니다',
      data,
    );
  }
}
