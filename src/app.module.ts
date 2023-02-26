import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './tests/users/users.module';
import { AdminModule } from './tests/admin/admin.module';
import { LoginModule } from './tests/login/login.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './tests/upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      username: 'root',
      password: '809000liuLIU',
      host: '127.0.0.1',
      port: 3306,
      database: 'golang',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
