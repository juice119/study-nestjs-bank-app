import { HttpException, HttpStatus } from '@nestjs/common';
import { BankAppHttpException } from '../../exception/BankAppHttpException';
import { BankAppResponse } from '../../common-dto/BankAppResponse';

export class HttpExceptionFilterResponse extends BankAppResponse {
  constructor(statusCode: HttpStatus, message: string, data?: object) {
    super(statusCode, message, data);
  }

  static byException(exception: BankAppHttpException | HttpException) {
    return new HttpExceptionFilterResponse(
      exception.getStatus(),
      exception.message,
      exception instanceof BankAppHttpException ? exception.data : {},
    );
  }
}
