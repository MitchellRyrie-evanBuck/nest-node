import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { Logger } from '@/Log/Logger';

@Global()
@Module({
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(Logger).forRoutes({
    //   path: 'login',
    //   method: RequestMethod.GET,
    // });
    consumer.apply(Logger).forRoutes(LoginController);
  }
}
