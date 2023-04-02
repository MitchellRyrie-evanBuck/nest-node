import { CacheModuleOptions } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { AuthModuleOptions } from '@nestjs/passport';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { ServeStaticOptions } from '@nestjs/platform-express/interfaces/serve-static-options.interface';
import { OpenAPIObject } from '@nestjs/swagger';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { CasbinModuleOptions } from '@/packages';

export type IConfig = {
  /** 端口 */
  port: number;
  /** 静态资源配置 */
  static?: {
    path?: string;
    config?: ServeStaticOptions;
  };
  /** 缓存配置 */
  cache?: CacheModuleOptions;
  /** 权限控制配置 */
  casbin?: CasbinModuleOptions;
  /** 鉴权配置 */
  passport?: AuthModuleOptions;
  /** JSON Web Token 配置 */
  jwt?: JwtModuleOptions;
  /** 上传配置 */
  multer?: MulterModuleOptions;
  /** 数据库配置 */
  typeorm?: TypeOrmModuleOptions;
  /** 连接限制配置 */
  throttler?: ThrottlerModuleOptions;
  /** 接口文档 */
  swagger?: {
    path?: string;
    config?: Pick<
      OpenAPIObject,
      'openapi' | 'info' | 'servers' | 'security' | 'tags' | 'externalDocs'
    >;
  };
};
