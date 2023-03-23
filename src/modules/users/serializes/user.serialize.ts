import { ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude, Transform } from 'class-transformer'

import { GenderCNEnum } from '@/enums'

export class UserSerialize {
  @ApiPropertyOptional({ description: '记录编号' })
  id: number

  @ApiPropertyOptional({ description: '用户编号' })
  userId: string

  @ApiPropertyOptional({ description: '用户账号' })
  username: string

  @Exclude()
  password: string

  @ApiPropertyOptional({ description: '性别' })
  @Transform(({ value }) => (value === null ? null : GenderCNEnum[value]))
  gender: number

  @ApiPropertyOptional({ description: '年龄' })
  age: number

  @ApiPropertyOptional({ description: '手机号' })
  mobile: string

  constructor(partial: Partial<UserSerialize>) {
    Object.assign(this, partial)
  }
}
