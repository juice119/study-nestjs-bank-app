import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/Account.entity';
import { BaseTable } from '../../BaseEntities/BaseTable/BaseTable';
import { AccountStatementType } from './enum/AccountStatementType';

@Entity()
export class AccountStatement extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  type: string;

  @Column({ nullable: false })
  money: number;

  @ManyToOne(() => Account, (account) => account.accountStatements, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  account: Account;

  static toDeposit(depositMoney: number, account: Account) {
    if (depositMoney <= 0) {
      throw new Error(
        `1원 미만에 금액을 입금 할 수 없습니다. 입금 금액(${depositMoney})`,
      );
    }
    const accountStatement = new AccountStatement();
    accountStatement.money = depositMoney;
    accountStatement.account = account;
    accountStatement.type = AccountStatementType.DEPOSIT;

    return accountStatement;
  }

  static toWithdraw(withdrawMoney: number, account: Account) {
    if (withdrawMoney >= 0) {
      throw new Error(`출금 금액에 문제가 있습니다`);
    }
    const accountStatement = new AccountStatement();
    accountStatement.money = withdrawMoney;
    accountStatement.type = AccountStatementType.WITHDRAW;
    accountStatement.account = account;
    return accountStatement;
  }
}
