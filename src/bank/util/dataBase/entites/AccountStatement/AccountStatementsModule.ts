import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountStatement } from './AccountStatement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountStatement])],
  exports: [TypeOrmModule],
})
export class AccountStatementsModule {}
