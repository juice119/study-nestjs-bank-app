import { HttpException, HttpStatus } from '@nestjs/common';
import { BankAppHttpException } from '../../exception/BankAppHttpException';
import { DateTimeUtil } from '../../DateTime/DateTimeUtil';
import { LocalDateTime } from '@js-joda/core';

export class HttpExceptionFilterResponse {
  statusCode: HttpStatus;
  message: string;
  timestamp: string;
  data: object = {};

  constructor(
    statusCode: HttpStatus,
    message: string,
    timestamp: string,
    data?: object,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = timestamp;
    if (data) {
      this.data = data;
    }
  }

  static byException(exception: BankAppHttpException | HttpException) {
    return new HttpExceptionFilterResponse(
      exception.getStatus(),
      exception.message,
      DateTimeUtil.toString(LocalDateTime.now()),
      exception instanceof BankAppHttpException ? exception.data : {},
    );
  }
}
