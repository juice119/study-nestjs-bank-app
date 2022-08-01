import { Test, TestingModule } from '@nestjs/testing';
import { NestApplication } from '@nestjs/core';
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { BankAppHttpException } from '../../../../../src/bank/exception/BankAppHttpException';
import * as request from 'supertest';
import { HttpExceptionFilterResponse } from '../../../../../src/bank/filter/dto/HttpExceptionFilterResponse';
import { HttpExceptionFilter } from '../../../../../src/bank/filter/HttpExceptionFilter';

describe('HttpExceptionFilter Test', () => {
  let app: NestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  it('BankAppHttpException 예외처리', async () => {
    // when
    const response = await request(app.getHttpServer()).get(
      '/BankAppHttpException',
    );
    const httpExceptionFilterResponse = new HttpExceptionFilterResponse(
      response.body.statusCode,
      response.body.message,
      response.body.timestamp,
      response.body.data,
    );

    // then
    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    expect(httpExceptionFilterResponse.statusCode).toBe(HttpStatus.FORBIDDEN);
    expect(httpExceptionFilterResponse.message).toBe('테스트 에러');
    expect(httpExceptionFilterResponse.data).toStrictEqual({
      testData: { a: 1, b: 1, c: 1 },
    });
  });

  it('HttpException 예외처리', async () => {
    // when
    const response = await request(app.getHttpServer()).get('/HttpException');
    const httpExceptionFilterResponse = new HttpExceptionFilterResponse(
      response.body.statusCode,
      response.body.message,
      response.body.timestamp,
      response.body.data,
    );

    // then
    expect(response.statusCode).toBe(HttpStatus.CONFLICT);
    expect(httpExceptionFilterResponse.statusCode).toBe(HttpStatus.CONFLICT);
    expect(httpExceptionFilterResponse.message).toBe(
      'HTTP EXCEPTION 테스트 에러',
    );
    expect(httpExceptionFilterResponse.data).toStrictEqual({});
  });

  it('HttpException 예외처리', async () => {
    // when
    const response = await request(app.getHttpServer()).get('/Default');
  });
});

@Controller()
class TestController {
  @Get('/BankAppHttpException')
  getBankAppHttpException() {
    throw new BankAppHttpException(HttpStatus.FORBIDDEN, '테스트 에러', {
      testData: { a: 1, b: 1, c: 1 },
    });
  }

  @Get('/HttpException')
  getHttpException() {
    throw new HttpException('HTTP EXCEPTION 테스트 에러', HttpStatus.CONFLICT);
  }

  @Get('/Default')
  getDefault() {
    return { a: 1 };
  }
}
