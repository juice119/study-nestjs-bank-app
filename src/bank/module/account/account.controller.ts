import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AccountCreateRequest } from './dto/AccountCreateRequest';
import { AccountCreateResponse } from './dto/AccountCreateResponse';

@ApiTags('account')
@Controller('/account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('/create')
  @ApiResponse({
    type: AccountCreateResponse,
  })
  async create(@Body() accountCreateRequest: AccountCreateRequest) {
    const account = await this.accountService.create(accountCreateRequest);
    return AccountCreateResponse.byAccount(account);
  }
}
