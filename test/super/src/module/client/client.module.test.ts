import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
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
    it('고객은 이름, 이메일 입력하여 등록할 수 있다', async () => {
      //given
      const userName = '후추';
      const email = 'peper@test-bank.com';
      const clientSignUpRequest = new ClientSignUpRequest(userName, email);

      // when
      const response = await request(app.getHttpServer())
        .post(url)
        .send(clientSignUpRequest);
      const clientSignUpResponse = ClientSignUpResponse.byObject(response.body);
      // then
      expect(clientSignUpResponse.name).toBe(userName);
      expect(clientSignUpResponse.email).toBe(email);
    });

    describe('validation 검사', () => {
      it('이름은  1 ~ 25 글자 까지, 한/영만 사용이 가능하다', async () => {
        //given
        const userName = '후추';
        const email = 'peper@test-bank.com';
        const clientSignUpRequest = new ClientSignUpRequest(userName, email);

        // when
        const response = await request(app.getHttpServer())
          .post(url)
          .send(clientSignUpRequest);

        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });
  });
});
