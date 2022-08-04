import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../util/dataBase/entites/account/Account.entity';
import { Repository } from 'typeorm';
import { Client } from '../../util/dataBase/entites/client/client.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
}
