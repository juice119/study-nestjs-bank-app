import { HttpStatus } from '@nestjs/common';
import { DateTimeUtil } from '../util/DateTime/DateTimeUtil';
import { LocalDateTime } from '@js-joda/core';

export class BankAppResponse {
  statusCode: HttpStatus;
  message: string;
  timestamp: string;
  data: object;

  constructor(
    statusCode: HttpStatus,
    message: string,
    data: object,
    timestamp?: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data || {};
    this.timestamp = timestamp
      ? timestamp
      : DateTimeUtil.toString(LocalDateTime.now());
  }

  static byObject(object) {
    return new BankAppResponse(
      object.statusCode,
      object.message,
      object.data,
      object.timestamp,
    );
  }
}
