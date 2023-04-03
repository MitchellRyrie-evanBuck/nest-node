import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from './redis-cache.service';
import { CacheModule, Module, Global } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          // store: redisStore,
          host: '127.0.0.1',
          port: 6379,
          db: 0, //目标库,
          // auth_pass: configService.get('REDIS_PASSWORD'), // 密码,没有可以不写
        };
      },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
