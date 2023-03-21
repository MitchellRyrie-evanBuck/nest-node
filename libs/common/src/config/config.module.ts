import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import customConfig from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 作用于全局
      load: [customConfig], // 加载自定义配置项
    }),
  ],
})
export class configModule {}
