import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ClientModule } from '../../../../../../src/bank/module/client/client.module';
import { ClientSignUpRequest } from '../../../../../../src/bank/module/client/dto/clientSignUpRequest';
import * as request from 'supertest';
import { resetMainAppSetting } from '../../../../../../src/bank/resetMainAppSetting';
import { ClientSignUpResponse } from '../../../../../../src/bank/module/client/dto/ClientSignUpResponse';
import { BankAppResponse } from '../../../../../../src/bank/common-dto/BankAppResponse';
import { getDataBaseConnection } from '../../../../../../src/bank/util/dataBase/dataBaseConnection/getDataBaseConnection';
import { Repository } from 'typeorm';
import { Client } from '../../../../../../src/bank/util/dataBase/entites/client/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Client Module Super Test', () => {
  let app: INestApplication;
  let clientRepository: Repository<Client>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClientModule, getDataBaseConnection()],
    }).compile();

    app = moduleFixture.createNestApplication();
    resetMainAppSetting(app);
    clientRepository = moduleFixture.get(getRepositoryToken(Client));
    await app.init();
  });

  beforeEach(() => {
    clientRepository.clear();
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
      const clientSignUpResponse = ClientSignUpResponse.byObject(
        response.body.data,
      );
      const insertClient = await clientRepository.findOne({
        where: { id: clientSignUpResponse.id },
      });

      // then
      expect(clientSignUpResponse.name).toBe(userName);
      expect(clientSignUpResponse.email).toBe(email);
      expect(insertClient.name).toBe(userName);
      expect(insertClient.email).toBe(email.toLowerCase());
    });

    it('이미 이메일이 존재하는 경우 에라가 발생한다.', async () => {
      //given
      const userName = '후추';
      const email = 'peper@test-bank.com';
      await clientRepository.save(Client.toSignup('미호', email));
      const clientSignUpRequest = new ClientSignUpRequest(userName, email);

      // when
      const response = await request(app.getHttpServer())
        .post(url)
        .send(clientSignUpRequest);
      const bankAppResponse = BankAppResponse.byObject(response.body);

      // then
      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
      expect(bankAppResponse.message).toBe('이미 가입한 이메일이 존재합니다.');
    });

    describe('validation 검사', () => {
      it('이름은  1 글자 이상을 입력해야 한다.', async () => {
        //given
        const userName = '  ';
        const email = 'peper@test-bank.com';
        const clientSignUpRequest = new ClientSignUpRequest(userName, email);

        // when
        const response = await request(app.getHttpServer())
          .post('/client/signup')
          .send(clientSignUpRequest);
        const bankAppResponse = BankAppResponse.byObject(response.body);

        // then
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(bankAppResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(bankAppResponse.data.validationErrors).toContainEqual(
          expect.objectContaining({
            property: 'name',
            constraints: { minLength: '최소 1글자 이상으로 입력해주세요.' },
          }),
        );
      });
      it('이름은  25 글자 이하로 입력해야 한다.', async () => {
        //given
        const userName = '12345678901234567890123456';
        const email = 'peper@test-bank.com';
        const clientSignUpRequest = new ClientSignUpRequest(userName, email);

        // when
        const response = await request(app.getHttpServer())
          .post('/client/signup')
          .send(clientSignUpRequest);
        const bankAppResponse = BankAppResponse.byObject(response.body);

        // then
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(bankAppResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(bankAppResponse.data.validationErrors).toContainEqual(
          expect.objectContaining({
            property: 'name',
            constraints: { maxLength: '최대 25글자 이하로 입력해주세요.' },
          }),
        );
      });
      it('이메일 형식이 아닌 경우 에러가 발생한다.', async () => {
        //given
        const userName = '후추';
        const email = 'peper@adasda./casca';
        const clientSignUpRequest = new ClientSignUpRequest(userName, email);

        // when
        const response = await request(app.getHttpServer())
          .post('/client/signup')
          .send(clientSignUpRequest);
        const bankAppResponse = BankAppResponse.byObject(response.body);

        // then
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(bankAppResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(bankAppResponse.data.validationErrors).toContainEqual(
          expect.objectContaining({
            property: 'email',
            constraints: { isEmail: '올바른 이메일 형식을 사용해주세요.' },
          }),
        );
      });
    });
  });
});
