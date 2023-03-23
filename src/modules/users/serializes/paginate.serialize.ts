import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'

import { UserSerialize } from './user.serialize'

export class PaginateSerialize {
  @ApiPropertyOptional({ description: '总数' })
  total: number

  @ApiPropertyOptional({ description: '页码' })
  @Transform(({ value }) => Number(value))
  pageNum: number

  @ApiPropertyOptional({ description: '页长' })
  @Transform(({ value }) => Number(value))
  pageSize: number

  @ApiPropertyOptional({ description: '用户列表', type: [UserSerialize] })
  @Type(() => UserSerialize)
  list: any[]

  constructor(partial: Partial<PaginateSerialize>) {
    Object.assign(this, partial)
  }
}
