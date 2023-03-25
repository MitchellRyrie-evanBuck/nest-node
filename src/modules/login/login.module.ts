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
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginGurad, UserEntity } from '@/entities';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([LoginGurad, UserEntity]),
    JwtModule.register({
      secret: 'allForLove', // 密钥
      signOptions: { expiresIn: '60s' }, // token 过期时效
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
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
