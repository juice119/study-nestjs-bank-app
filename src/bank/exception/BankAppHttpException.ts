import { HttpException, HttpStatus } from '@nestjs/common';

export class BankAppHttpException extends HttpException {
  data: object = {};

  constructor(httpStatus: HttpStatus, errorMessage: string, data?: object) {
    super(errorMessage, httpStatus);
    if (data) {
      this.data = data;
    }
  }

  static toSystemError() {
    return new BankAppHttpException(500, '시스템에 문제가 발생하였습니다.');
  }
}
