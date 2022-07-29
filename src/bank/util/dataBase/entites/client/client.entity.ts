import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/Account.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.client)
  accounts: Account[];
}
