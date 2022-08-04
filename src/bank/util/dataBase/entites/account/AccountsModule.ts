import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './Account.entity';

@Module({
  imports: [TypeOrmModule],
  exports: [TypeOrmModule.forFeature([Account])],
})
export class AccountsModule {}
