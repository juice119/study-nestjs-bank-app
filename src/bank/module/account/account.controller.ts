import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AccountCreateRequest } from './dto/AccountCreateRequest';
import { AccountCreateResponse } from './dto/AccountCreateResponse';
import { AccountDepositWithDrawParamsRequest } from './dto/AccountDepositWithDrawParamsRequest';
import { AccountDepositWithDrawResponse } from './dto/AccountDepositWithDrawResponse';
import { AccountDepositBodyRequest } from './dto/AccountDepositBodyRequest';

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

  @Patch(':accountId/deposit')
  @ApiResponse({
    type: AccountDepositWithDrawResponse,
  })
  deposit(
    @Param() paramsRequest: AccountDepositWithDrawParamsRequest,
    @Body() depositRequest: AccountDepositBodyRequest,
  ) {
    return new AccountDepositWithDrawResponse(
      paramsRequest.accountId,
      depositRequest.depositMoney,
      depositRequest.depositMoney,
    );
  }
}
