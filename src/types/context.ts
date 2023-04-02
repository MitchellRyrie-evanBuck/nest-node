import { Request, Response } from 'express';

import { UserEntity } from '@/entities';

/** 请求 */
export interface ICtxReq extends Request {
  user: UserEntity;
}

/** 响应 */
export type ICtxRes = Response;
