import { Injectable } from '@nestjs/common';
import { Account } from '../../util/dataBase/entites/account/Account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountStatement } from '../../util/dataBase/entites/AccountStatement/AccountStatement.entity';

@Injectable()
export class AccountReadRepository {
  constructor(
    @InjectRepository(AccountStatement)
    private accountStatementRepository: Repository<AccountStatement>,
  ) {}

  async getAccountMount(account: Account) {
    const { totalAmount } = await this.accountStatementRepository
      .createQueryBuilder()
      .select('SUM(AccountStatement.money)', 'totalAmount')
      .where('AccountStatement.account_id = :accountId', {
        accountId: account.id,
      })
      .getRawOne<{ totalAmount: string }>();
    return parseInt(totalAmount);
  }
}
