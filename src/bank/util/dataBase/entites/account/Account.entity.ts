import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Client } from '../client/client.entity';
import { AccountStatement } from '../AccountStatement/AccountStatement.entity';
import { BaseTable } from '../../BaseEntities/BaseTable/BaseTable';

@Entity()
export class Account extends BaseTable {
  @Column({ type: 'text', nullable: false, comment: '계좌 개설 목적' })
  purposeDescription;

  @ManyToOne(() => Client, (client) => client.accounts, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  client: Client;

  @OneToMany(
    () => AccountStatement,
    (accountStatement) => accountStatement.account,
    { createForeignKeyConstraints: false, nullable: false },
  )
  accountStatements: AccountStatement[];

  private constructor(
    purposeDescription,
    client: Client,
    accountStatements?: AccountStatement[],
  ) {
    super();
    this.purposeDescription = purposeDescription;
    this.client = client;
    this.accountStatements = accountStatements;
  }

  static create(purposeDescription, client: Client) {
    return new Account(purposeDescription, client);
  }
}
