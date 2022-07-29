import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/Account.entity';
import { BaseTable } from '../../BaseEntities/BaseTable/BaseTable';

@Entity()
export class AccountStatement extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  type: string;

  @ManyToOne(() => Account, (account) => account.accountStatements, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  account: Account;
}
