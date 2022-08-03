import { ValidationError } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { BankAppHttpException } from './BankAppHttpException';

export class ValidationException extends BankAppHttpException {
  validationErrors: ValidationError[];

  static ERROR_MESSAGE = '입력값에 문제가 있습니다';

  constructor(validationErrors: ValidationError[]) {
    super(
      HttpStatus.BAD_REQUEST,
      ValidationException.ERROR_MESSAGE,
      validationErrors,
    );
    this.validationErrors = validationErrors;
  }
}
