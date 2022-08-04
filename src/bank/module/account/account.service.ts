import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../util/dataBase/entites/account/Account.entity';
import { Repository } from 'typeorm';
import { Client } from '../../util/dataBase/entites/client/client.entity';
import { AccountCreateRequest } from './dto/AccountCreateRequest';
import { BankAppHttpException } from '../../exception/BankAppHttpException';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(accountCreateRequest: AccountCreateRequest): Promise<Account> {
    const client = await this.clientRepository.findOne({
      where: { email: accountCreateRequest.clientEmail },
    });
    if (!client) {
      throw new BankAppHttpException(
        HttpStatus.FORBIDDEN,
        '사용자가 존재하지 않습니다',
      );
    }

    return this.accountRepository.save(
      Account.create(accountCreateRequest.purposeDescription, client),
    );
  }
}
