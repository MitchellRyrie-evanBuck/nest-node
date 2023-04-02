import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import type { Request } from 'express';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    Logger.log(request.url, '正常接口请求');
    return next.handle().pipe(
      map((data) => ({
        // timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        status: HttpStatus.OK,
        message: 'success',
        data,
      })),
    );
  }
}
