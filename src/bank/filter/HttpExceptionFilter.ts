import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BankAppHttpException } from '../exception/BankAppHttpException';
import { Response } from 'express';
import { HttpExceptionFilterResponse } from './dto/HttpExceptionFilterResponse';
import { ValidationException } from '../exception/ValidationException';
import { BankAppResponse } from '../common-dto/BankAppResponse';

@Catch(HttpException)
@Catch(BankAppHttpException)
@Catch(ValidationException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception: BankAppHttpException | HttpException | ValidationException,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof ValidationException) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          new BankAppResponse(
            HttpStatus.BAD_REQUEST,
            '입력값에 문제가 있습니다.',
            { validationErrors: exception.validationErrors },
          ),
        );
    }

    return response
      .status(exception.getStatus())
      .json(HttpExceptionFilterResponse.byException(exception));
  }
}
