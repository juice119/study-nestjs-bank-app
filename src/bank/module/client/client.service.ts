import { HttpStatus, Injectable } from '@nestjs/common';
import { Client } from '../../util/dataBase/entites/client/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientSignUpRequest } from './dto/clientSignUpRequest';
import { Repository } from 'typeorm';
import { BankAppHttpException } from '../../exception/BankAppHttpException';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  private static passwordHashSaltRounds = 10;

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
    const encryptPassword = await this.encryptPassword(
      clientSignUpRequest.password,
    );

    return this.clientRepository.save(
      Client.toSignup(
        clientSignUpRequest.name,
        clientSignUpRequest.email,
        encryptPassword,
      ),
    );
  }

  private async hasDuplicateEmail(email: string) {
    const client = await this.clientRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    return !!client;
  }
  private async encryptPassword(password: string): Promise<string> {
    try {
      return bcrypt.hashSync(password, ClientService.passwordHashSaltRounds);
    } catch (e) {
      console.error('로그인 실패', e);
      throw BankAppHttpException.toSystemError();
    }
  }
}
