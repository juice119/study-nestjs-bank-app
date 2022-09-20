import { Controller, Get, Res } from '@nestjs/common';
import { MainService } from './main.service';
import { Response } from 'express';

@Controller('/')
export class MainController {
  constructor(private readonly appService: MainService) {}

  @Get()
  getHello(@Res() res: Response) {
    return res.render('mainPage', {
      message: '메인 페이지',
    });
  }
}
