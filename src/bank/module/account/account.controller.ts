import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller('/account')
export class AccountController {}
