import { registerAs } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { createHash } from 'crypto';
import { sync } from 'make-dir';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';

import { IConfig } from '@/types';

function initDirs() {
  sync('static/upload');
}
initDirs();

export default registerAs<IConfig>(
  '',
  (): IConfig => ({
    port: 3000,
    static: {
      path: resolve('static'),
    },
    cache: {
      ttl: 5,
      max: 20,
    },
    casbin: {
      path: resolve('res/model.conf'),
      config: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test_for_node',
      },
    },
    multer: {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dir = resolve('static/upload');

          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const fileName = createHash('sha256')
            .update(file.originalname + Date.now())
            .digest('hex');
          const extName = extname(file.originalname);

          cb(null, `${fileName}${extName}`);
        },
      }),
    },
    passport: {
      defaultStrategy: 'jwt',
    },
    jwt: {
      secret: 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    },
    typeorm: {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test_for_node',
      entities: ['dist/**/*.entity.js'],
      retryAttempts: 5,
      retryDelay: 1500,
      synchronize: true,
    },
    swagger: {
      path: '/swagger',
      config: new DocumentBuilder()
        .setTitle('Nest Next Template')
        .setVersion('1.0.0')
        .setLicense('MulanPSL2', 'http://license.coscl.org.cn/MulanPSL2')
        .addBearerAuth({
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        })
        .build(),
    },
  }),
);
