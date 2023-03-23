import { ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsOptional,
  Max,
  Min
} from 'class-validator'

import { GenderEnum } from '@/enums'

export class FindUserDTO {
  // @ApiPropertyOptional({ description: '记录编号' })
  // @IsOptional()
  // id: number

  // @ApiPropertyOptional({ description: '用户编号' })
  // @IsOptional()
  // userId: string

  @ApiPropertyOptional({ description: '用户名' })
  @IsOptional()
  name: string

  // @ApiPropertyOptional({ description: '性别' })
  // @IsOptional()
  // @IsEnum(GenderEnum, { message: '性别枚举值不正确' })
  // gender: number

  // @ApiPropertyOptional({ description: '年龄' })
  // @IsOptional()
  // @IsInt({ message: '年龄必须是整数' })
  // @Min(1, { message: '年龄最小值1' })
  // @Max(150, { message: '年龄最大值150' })
  // age: number

  // @ApiPropertyOptional({ description: '手机号' })
  // @IsOptional()
  // @IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' })
  // mobile: string
}
