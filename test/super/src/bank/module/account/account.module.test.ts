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
import { AccountDepositBodyRequest } from '../../../../../../src/bank/module/account/dto/AccountDepositBodyRequest';
import { AccountDepositWithDrawResponse } from '../../../../../../src/bank/module/account/dto/AccountDepositWithDrawResponse';
import { AccountWithdrawBodyRequest } from '../../../../../../src/bank/module/account/dto/AccountWithdrawBodyRequest';
import { AccountWithDrawResponse } from '../../../../../../src/bank/module/account/dto/AccountWithdrawResponse';

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

    await clientRepository.clear();
    await accountRepository.clear();
    await accountStatementRepository.clear();
    await app.init();
  });

  beforeEach(async () => {
    await clientRepository.clear();
    await accountRepository.clear();
    await accountStatementRepository.clear();
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

  describe('[PATCH][:accountId/deposit] 계좌에 금액을 입금할 수 있다.', () => {
    beforeEach(async () => {
      await clientRepository.clear();
      await accountRepository.clear();
      await accountStatementRepository.clear();
    });

    it('입금 할 수 있다.', async () => {
      // given
      const client = await clientRepository.save(
        Client.toSignup('tester', 'test@test.com'),
      );
      const givenAccount = await accountRepository.save(
        Account.create('테스트', client),
      );
      const nowAccountMount = 1000;
      await accountStatementRepository.save(
        AccountStatement.toDeposit(nowAccountMount, givenAccount),
      );
      const accountId = givenAccount.id;
      const depositMoney = 10_000;

      // when
      const response = await request(app.getHttpServer())
        .patch(`/account/${accountId}/deposit`)
        .send(new AccountDepositBodyRequest(depositMoney));
      const accountDepositResponse = AccountDepositWithDrawResponse.byObject(
        response.body.data,
      );

      // then
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(accountDepositResponse.accountId).toBe(accountId);
      expect(accountDepositResponse.depositMoney).toBe(depositMoney);
      expect(accountDepositResponse.accountMount).toBe(
        depositMoney + nowAccountMount,
      );

      const { totalMoney } = await accountStatementRepository
        .createQueryBuilder()
        .select('SUM(AccountStatement.money)', 'totalMoney')
        .where('account_id=:accountId', { accountId: accountId })
        .getRawOne<{ totalMoney: string }>();
      expect(parseInt(totalMoney)).toEqual(depositMoney + nowAccountMount);
    });
  });

  describe('[PATCH][:accountId/withdraw] 계좌에 금액을 출금 할 수 있다.', () => {
    beforeEach(async () => {
      await clientRepository.clear();
      await accountRepository.clear();
      await accountStatementRepository.clear();
    });

    it('출금 할 수 있다.', async () => {
      // given
      const withdrawMoney = -3000;
      const nowAccountMount = 10000;
      const client = await clientRepository.save(
        Client.toSignup('tester', 'test@test.com'),
      );
      const account = await accountRepository.save(
        Account.create('테스트', client),
      );
      await accountStatementRepository.save(
        AccountStatement.toDeposit(nowAccountMount, account),
      );

      // when
      const response = await request(app.getHttpServer())
        .patch(`/account/${account.id}/withdraw`)
        .send(new AccountWithdrawBodyRequest(withdrawMoney));
      const accountWithDrawResponse = AccountWithDrawResponse.byObject(
        response.body.data,
      );

      // then
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(accountWithDrawResponse.accountMount).toBe(
        nowAccountMount + withdrawMoney,
      );
      const { totalMount } = await accountStatementRepository
        .createQueryBuilder()
        .select('SUM(AccountStatement.money)', 'totalMount')
        .where('AccountStatement.account_id = :accountId', {
          accountId: account.id,
        })
        .getRawOne<{ totalMount: string }>();
      expect(parseInt(totalMount)).toBe(nowAccountMount + withdrawMoney);
    });

    it('출금 계좌가 존재하지 않는 에러 발생', async () => {
      // given
      const withdrawMoney = -3000;
      const notDefinedAccountId = 12345678;

      // when
      const response = await request(app.getHttpServer())
        .patch(`/account/${notDefinedAccountId}/withdraw`)
        .send(new AccountWithdrawBodyRequest(withdrawMoney));
      const bankAppResponse = BankAppResponse.byObject(response.body);

      // then
      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
      expect(bankAppResponse.message).toBe('출금 계좌를 찾을수 없습니다.');
    });

    it('출금 금액이 부족한 경우 에러 발생', async () => {
      // given
      const withdrawMoney = -3000;
      const nowAccountMount = 1000;
      const client = await clientRepository.save(
        Client.toSignup('tester', 'test@test.com'),
      );
      const account = await accountRepository.save(
        Account.create('테스트', client),
      );
      await accountStatementRepository.save(
        AccountStatement.toDeposit(nowAccountMount, account),
      );

      // when
      const response = await request(app.getHttpServer())
        .patch(`/account/${account.id}/withdraw`)
        .send(new AccountWithdrawBodyRequest(withdrawMoney));
      const bankAppResponse = BankAppResponse.byObject(response.body);

      // then
      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
      expect(bankAppResponse.message).toBe('계좌 잔액이 부족합니다');
    });
    it.todo('최소 1000원 단위로 떨어져야 한다.');
  });
});
