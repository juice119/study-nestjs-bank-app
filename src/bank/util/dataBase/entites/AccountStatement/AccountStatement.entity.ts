import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/Account.entity';

@Entity()
export class AccountStatement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  type: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.accountStatements)
  account: Account;
}
