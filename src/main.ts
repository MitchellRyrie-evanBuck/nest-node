import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Response } from '@/common/response';
import { HttpFilter } from '@/common/filter';
import { join } from 'path';
import { LoginGuard } from '@/modules/login/login.guard';
import { HttpExceptionFilter } from '@/filters/http-exception.filter'
import { TransformInterceptor } from '@/Interceptor/transform.interceptor';

const whiteList = ['/list'];
function middleWareAll(req, res, next) {
  // console.log(req.originalUrl, '我收全局的');

  // if (whiteList.includes(req.originalUrl)) {
  next();
  // } else {
  // res.send('小黑子露出鸡脚了吧');
  // }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('node')
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
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/AFL',
  });
  app.use(cors());
  app.use(middleWareAll);
  SwaggerModule.setup('/api-docs', app, document);
  // app.useGlobalInterceptors(new Response());
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpFilter());
  // app.useGlobalGuards(new LoginGuard()); // 全局守卫
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
