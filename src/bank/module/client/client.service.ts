import { HttpStatus, Injectable } from '@nestjs/common';
import { Client } from '../../util/dataBase/entites/client/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientSignUpRequest } from './dto/clientSignUpRequest';
import { Repository } from 'typeorm';
import { BankAppHttpException } from '../../exception/BankAppHttpException';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async signUp(clientSignUpRequest: ClientSignUpRequest) {
    if (await this.hasDuplicateEmail(clientSignUpRequest.email)) {
      throw new BankAppHttpException(
        HttpStatus.FORBIDDEN,
        '이미 가입한 이메일이 존재합니다.',
      );
    }

    return this.clientRepository.save(
      Client.toSignup(clientSignUpRequest.name, clientSignUpRequest.email),
    );
  }

  private async hasDuplicateEmail(email: string) {
    const client = await this.clientRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    return !!client;
  }
}
