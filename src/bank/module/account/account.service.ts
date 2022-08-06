import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../util/dataBase/entites/account/Account.entity';
import { Repository } from 'typeorm';
import { Client } from '../../util/dataBase/entites/client/client.entity';
import { AccountCreateRequest } from './dto/AccountCreateRequest';
import { BankAppHttpException } from '../../exception/BankAppHttpException';
import { AccountDepositBodyRequest } from './dto/AccountDepositBodyRequest';
import { AccountDepositWithDrawParamsRequest } from './dto/AccountDepositWithDrawParamsRequest';
import { AccountReadRepository } from './accountReadRepository';
import { AccountStatement } from '../../util/dataBase/entites/AccountStatement/AccountStatement.entity';
import { AccountDepositWithDrawResponse } from './dto/AccountDepositWithDrawResponse';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private accountReadRepository: AccountReadRepository,
    @InjectRepository(AccountStatement)
    private accountStatementRepository: Repository<AccountStatement>,
  ) {}

  async create(accountCreateRequest: AccountCreateRequest): Promise<Account> {
    const client = await this.clientRepository.findOne({
      where: { email: accountCreateRequest.clientEmail },
    });
    if (!client) {
      throw new BankAppHttpException(
        HttpStatus.FORBIDDEN,
        '사용자가 존재하지 않습니다',
      );
    }

    return this.accountRepository.save(
      Account.create(accountCreateRequest.purposeDescription, client),
    );
  }

  async deposit(
    depositParamsRequest: AccountDepositWithDrawParamsRequest,
    depositBodyRequest: AccountDepositBodyRequest,
  ) {
    const account = await this.accountRepository.findOne({
      where: { id: depositParamsRequest.accountId },
    });

    if (!account) {
      throw new BankAppHttpException(
        HttpStatus.FORBIDDEN,
        '계좌가 존재하지 않습니다',
      );
    }

    await this.resetAccountTotalAmount(account);
    if (account.notDepositOrWithDraw(depositBodyRequest.depositMoney)) {
      throw new BankAppHttpException(
        HttpStatus.FORBIDDEN,
        '입출금 할수 없는 금액입니다. 계좌 금액을 확인해주세요',
      );
    }

    const accountStatement = await this.accountStatementRepository.save(
      AccountStatement.toDeposit(depositBodyRequest.depositMoney, account),
    );
    await this.resetAccountTotalAmount(account);

    return new AccountDepositWithDrawResponse(
      account.id,
      account.totalMount,
      accountStatement.money,
    );
  }

  private async resetAccountTotalAmount(account: Account) {
    account.totalMount = await this.accountReadRepository.getAccountMount(
      account,
    );
    return account;
  }
}
