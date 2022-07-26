import { Body, Controller, Post } from '@nestjs/common';
import { ClientSignUpRequest } from './dto/clientSignUpRequest';

@Controller('/client')
export class ClientController {
  @Post('/signup')
  signUpClient(@Body() clientSignUpRequest: ClientSignUpRequest) {
    return clientSignUpRequest;
  }
}
