import Redis from 'ioredis';

import config from '@/config';

console.log(config, '-------');

const { redisConfig, redisClusterConfig } = config;
export class RedisInstance {
  static async initRedis(connectType?: string) {
    if (connectType && connectType === 'cluster') {
      const cluster = new Redis.Cluster(redisClusterConfig);
      cluster.on('error', (err) => console.log('Redis cluster Error', err));
      cluster.on('connect', () => console.log('redis集群连接成功'));
      return cluster;
    } else {
      const redis = new Redis(redisConfig);
      redis.on('error', (err) => console.log('Redis cluster Error', err));
      redis.on('connect', () => console.log('redis连接成功'));
      return redis;
    }
  }
}
