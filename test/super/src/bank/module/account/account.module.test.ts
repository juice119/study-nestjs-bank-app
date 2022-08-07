import { Test, TestingModule } from '@nestjs/testing';
import { getDataBaseConnection } from '../../../../../../src/bank/util/dataBase/dataBaseConnection/getDataBaseConnection';
import { resetMainAppSetting } from '../../../../../../src/bank/resetMainAppSetting';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../../../../../../src/bank/util/dataBase/entites/client/client.entity';
import { AccountModule } from '../../../../../../src/bank/module/account/account.module';
import { Account } from '../../../../../../src/bank/util/dataBase/entites/account/Account.entity';
import { AccountStatement } from '../../../../../../src/bank/util/dataBase/entites/AccountStatement/AccountStatement.entity';
import { Repository } from 'typeorm';
import { AccountCreateRequest } from '../../../../../../src/bank/module/account/dto/AccountCreateRequest';
import * as request from 'supertest';
import { AccountCreateResponse } from '../../../../../../src/bank/module/account/dto/AccountCreateResponse';
import { HttpStatus } from '@nestjs/common';
import { BankAppResponse } from '../../../../../../src/bank/common-dto/BankAppResponse';

describe('계좌 API SUPER 테스트', () => {
  let app;
  let clientRepository: Repository<Client>;
  let accountRepository: Repository<Account>;
  let accountStatementRepository: Repository<AccountStatement>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AccountModule, getDataBaseConnection()],
    }).compile();

    app = moduleFixture.createNestApplication();
    resetMainAppSetting(app);
    clientRepository = moduleFixture.get<Repository<Client>>(
      getRepositoryToken(Client),
    );
    accountRepository = moduleFixture.get(getRepositoryToken(Account));
    accountStatementRepository = moduleFixture.get(
      getRepositoryToken(AccountStatement),
    );

    await accountRepository.clear();
    await app.init();
  });

  describe('[POST][account/create] 계좌 만들기 API', () => {
    beforeEach(async () => {
      await clientRepository.clear();
      await accountRepository.clear();
      await accountStatementRepository.clear();
    });

    it('사용자는 계좌를 만들 수 있다.', async () => {
      // given
      const email = 'test@test.com';
      const publishDescription = '월급 통장';
      const client = await clientRepository.save(
        Client.toSignup('tester', email),
      );
      const accountCreateRequest = new AccountCreateRequest(
        email,
        publishDescription,
      );

      // when
      const response = await request(app.getHttpServer())
        .post('/account/create')
        .send(accountCreateRequest);

      // then
      expect(response.statusCode).toBe(201);
      const accountCreateResponse = AccountCreateResponse.byObject(
        response.body.data,
      );
      expect(accountCreateResponse.purposeDescription).toBe(publishDescription);
      const insertAccount = await accountRepository.findOne({
        where: { id: accountCreateResponse.accountId },
        relations: { client: true },
      });
      expect(insertAccount.client.id).toBe(client.id);
      expect(insertAccount.purposeDescription).toBe(publishDescription);
    });

    it('사용자가 존재하지 않는 경우 에러 발생.', async () => {
      // given
      const email = 'unknown-email@unknown.com';
      const publishDescription = '월급 통장';
      const accountCreateRequest = new AccountCreateRequest(
        email,
        publishDescription,
      );

      // when
      const response = await request(app.getHttpServer())
        .post('/account/create')
        .send(accountCreateRequest);
      const bankAppResponse = BankAppResponse.byObject(response.body);

      // then
      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
      expect(bankAppResponse.message).toBe('사용자가 존재하지 않습니다');
    });
  });
});
