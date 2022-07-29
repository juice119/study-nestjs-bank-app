import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/Account.entity';
import { IsEmail } from 'class-validator';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  // TODO 한/영 1~25자 제한 클래스 밸리데이터 추가하기
  name: string;

  @Column({ length: 100, nullable: false, unique: true })
  @IsEmail()
  email: string;

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
