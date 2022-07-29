import { Body, Controller, Post } from '@nestjs/common';
import { ClientSignUpRequest } from './dto/clientSignUpRequest';
import { ClientSignUpResponse } from './dto/ClientSignUpResponse';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalDateTime } from '@js-joda/core';

@ApiTags('client')
@Controller('/client')
export class ClientController {
  @Post('/signup')
  @ApiResponse({ type: ClientSignUpResponse })
  signUpClient(
    @Body() clientSignUpRequest: ClientSignUpRequest,
  ): ClientSignUpResponse {
    return new ClientSignUpResponse(
      1,
      clientSignUpRequest.name,
      clientSignUpRequest.email,
      LocalDateTime.now(),
    );
  }
}
