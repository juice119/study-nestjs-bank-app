import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientModule } from '../../../../../src/bank/module/client/client.module';
import { ClientSignUpRequest } from '../../../../../src/bank/module/client/dto/clientSignUpRequest';
import * as request from 'supertest';
import { resetMainAppSetting } from '../../../../../src/bank/resetMainAppSetting';
import { ClientSignUpResponse } from '../../../../../src/bank/module/client/dto/ClientSignUpResponse';

describe('Client Module Super Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClientModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    resetMainAppSetting(app);
    await app.init();
  });

  describe('(POST) /client/signup 회원가입', () => {
    const url = '/client/signup';
    it('신규 유저 회원 가입', async () => {
      //given
      const userName = '후추';
      const description = '회사원';
      const clientSignUpRequest = new ClientSignUpRequest(
        userName,
        description,
      );

      // when
      const { body } = await request(app.getHttpServer())
        .post(url)
        .send(clientSignUpRequest);
      const clientSignUpResponse = new ClientSignUpResponse(
        body.id,
        body.name,
        body.description,
        body.createdAt,
      );

      // then
      expect(clientSignUpResponse.name).toBe(userName);
      expect(clientSignUpResponse.email).toBe(description);
    });
  });
});
