import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Account } from '../account/Account.entity';
import { IsEmail } from 'class-validator';
import { BaseTable } from '../../BaseEntities/BaseTable/BaseTable';

@Entity()
@Unique(`unique_${Client.tableName}_email_constraint`, ['email'])
export class Client extends BaseTable {
  static tableName = 'client';

  @Column({ length: 50, nullable: false })
  // TODO 한/영 1~25자 제한 클래스 밸리데이터 추가하기
  name: string;

  @Column({ length: 100, nullable: false })
  @IsEmail()
  email: string;

  @Column({
    type: 'text',
  })
  description: string;

  @OneToMany(() => Account, (account) => account.client)
  accounts: Account[];
}
