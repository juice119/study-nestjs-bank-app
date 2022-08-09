import {
  Body,
  Controller,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AccountCreateRequest } from './dto/AccountCreateRequest';
import { AccountCreateResponse } from './dto/AccountCreateResponse';
import { AccountDepositWithDrawParamsRequest } from './dto/AccountDepositWithDrawParamsRequest';
import { AccountDepositWithDrawResponse } from './dto/AccountDepositWithDrawResponse';
import { AccountDepositBodyRequest } from './dto/AccountDepositBodyRequest';
import { BankAppHttpException } from '../../exception/BankAppHttpException';
import { AccountWithdrawBodyRequest } from './dto/AccountWithdrawBodyRequest';
import { AccountWithDrawResponse } from './dto/AccountWithdrawResponse';

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

  @Patch('/:accountId/deposit')
  @ApiResponse({
    type: AccountDepositWithDrawResponse,
  })
  async deposit(
    @Param() paramsRequest: AccountDepositWithDrawParamsRequest,
    @Body() depositRequest: AccountDepositBodyRequest,
  ) {
    try {
      return this.accountService.deposit(paramsRequest, depositRequest);
    } catch (e: any | HttpException | BankAppHttpException) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw BankAppHttpException.toSystemError();
    }
  }

  @Patch('/:accountId/withdraw')
  @ApiResponse({ type: AccountWithDrawResponse })
  async withdraw(
    @Param() paraRequest: AccountDepositWithDrawParamsRequest,
    @Body() bodyRequest: AccountWithdrawBodyRequest,
  ) {
    try {
      return this.accountService.withdraw(
        paraRequest.accountId,
        bodyRequest.withdrawMoney,
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
