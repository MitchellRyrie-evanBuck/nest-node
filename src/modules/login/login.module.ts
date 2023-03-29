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
import { LoginGurad, UserEntity, TagsEntity } from '@/entities';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersService } from '../users/users.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/gurad';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([LoginGurad, UserEntity, TagsEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'allForLove', // 密钥
      signOptions: { expiresIn: '24h' }, // token 过期时效
    }),
    // PassportModule,
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy, LocalStrategy, UsersService],
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
