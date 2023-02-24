import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('apidoc')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(
    session({
      secret: 'AFL', // 生成服务端session 签名 可以理解为加盐
      name: 'AFL.session', //	生成客户端cookie 的名字 默认 connect.sid
      rolling: true, //设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
      cookie: { maxAge: null }, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
    }),
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
