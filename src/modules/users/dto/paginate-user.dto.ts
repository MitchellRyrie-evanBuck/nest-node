import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

import { FindUserDTO } from './find-user.dto'

/** 用户分页参数 */
export class PaginateUserDTO extends FindUserDTO {
  @ApiProperty({ description: '页面', default: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: '页码必须时正整数' })
  @Min(1, { message: '页码最小值1' })
  pageNum: number

  @ApiProperty({ description: '页长', default: 10 })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: '页长必须时正整数' })
  pageSize: number
}
