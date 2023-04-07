import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@/modules/users/users.module';
import { AdminModule } from '@/modules/admin/admin.module';
import { LoginModule } from '@/modules/login/login.module';
import { TagsModule } from '@/modules/tags/tags.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from '@/modules/upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity, LoginGurad, TagsEntity } from '@/entities/index';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/gurad';
import { RedisCacheModule } from '@/db/redis-cache.module';

@Module({
  imports: [
    UsersModule,
    AdminModule,
    LoginModule,
    ConfigModule.forRoot({
      path: 'AFL',
    }),
    UploadModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      // username: 'root',
      username: 'xiaowen',
      // password: '809000liuLIU',
      password: 'xiaowen',
      host: '127.0.0.1',
      port: 3306,
      database: 'node',
      // entities: [__dirname + 'src/**/*.entity{.ts,.js}'],
      entities: [UserEntity, LoginGurad, TagsEntity],
      synchronize: true,
    }),
    AuthModule,
    TagsModule,
    // RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
