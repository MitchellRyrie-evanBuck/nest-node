import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './tests/users/users.module';
import { AdminModule } from './tests/admin/admin.module';
import { LoginModule } from './tests/login/login.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './tests/upload/upload.module';

@Module({
  imports: [
    UsersModule,
    AdminModule,
    LoginModule,
    ConfigModule.forRoot({
      path: 'AFL',
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
