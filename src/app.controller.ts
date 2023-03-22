import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginService } from '@/modules/login/login.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loginService: LoginService,
  ) {}

  @Get()
  getHello(): string {
    return (
      this.appService.getHello() +
      this.loginService.findAll({ keyWord: 'lui', page: 1, pageSize: 10 })
    );
  }
}
