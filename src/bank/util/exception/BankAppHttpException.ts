import { HttpException, HttpStatus } from '@nestjs/common';

export class BankAppHttpException extends HttpException {
  data: object = {};

  constructor(httpStatus: HttpStatus, errorMessage: string, data?: object) {
    super(errorMessage, httpStatus);
    if (data) {
      this.data = data;
    }
  }
}
