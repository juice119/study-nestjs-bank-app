import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ClientSignUpRequest } from './dto/clientSignUpRequest';
import { ClientSignUpResponse } from './dto/ClientSignUpResponse';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { BankAppHttpException } from '../../exception/BankAppHttpException';

@ApiTags('client')
@Controller('/client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post('/signup')
  @ApiResponse({ type: ClientSignUpResponse })
  async signUpClient(
    @Body() clientSignUpRequest: ClientSignUpRequest,
  ): Promise<ClientSignUpResponse> {
    try {
      const client = await this.clientService.signUp(clientSignUpRequest);
      return new ClientSignUpResponse(
        client.id,
        client.name,
        client.email,
        client.createdAt,
      );
    } catch (e: any | BankAppHttpException) {
      if (e instanceof BankAppHttpException) {
        throw e;
      }

      console.error('회원가입 중 에러발생', e);
      throw new BankAppHttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        '에러 발생',
      );
    }
  }
}
