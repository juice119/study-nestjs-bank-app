import { Client } from '../../../../../src/bank/util/dataBase/entites/client/client.entity';
import { Repository } from 'typeorm';

export class ClientTestRepository {
  clientRepository: Repository<Client>;
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async signUp({
    name = 'tester',
    email = 'test@test.com',
    encryptedPassword = 'testPassword',
  }) {
    const client = Client.toSignup(name, email, encryptedPassword);
    return this.clientRepository.save(client);
  }

  clear() {
    return this.clientRepository.clear();
  }
}
