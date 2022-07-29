import { Column, Entity, OneToMany } from 'typeorm';
import { Account } from '../account/Account.entity';
import { IsEmail } from 'class-validator';
import { BaseTable } from '../../BaseEntities/BaseTable/BaseTable';

@Entity()
export class Client extends BaseTable {
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

  @OneToMany(() => Account, (account) => account.client)
  accounts: Account[];
}
