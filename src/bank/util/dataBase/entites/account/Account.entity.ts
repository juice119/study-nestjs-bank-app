import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../client/client.entity';
import { AccountStatement } from '../AccountStatement/AccountStatement.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, comment: '계좌 개설 목적' })
  purposeDescription;

  @ManyToOne(() => Client, (client) => client.accounts)
  client: Client[];

  @OneToMany(
    () => AccountStatement,
    (accountStatement) => accountStatement.account,
  )
  accountStatements: AccountStatement[];
}
