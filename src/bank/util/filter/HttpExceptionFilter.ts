import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { BankAppHttpException } from '../exception/BankAppHttpException';
import { Response } from 'express';
import { HttpExceptionFilterResponse } from './dto/HttpExceptionFilterResponse';

@Catch(HttpException)
@Catch(BankAppHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BankAppHttpException | HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    return response
      .status(exception.getStatus())
      .json(HttpExceptionFilterResponse.byException(exception));
  }
}
