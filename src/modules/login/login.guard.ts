import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.Reflector.get<string[]>('role', context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    if (admin.includes(request.query.role as string)) {
      return true;
    } else {
      return false;
    }
  }
}
