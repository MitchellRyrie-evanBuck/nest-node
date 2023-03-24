
import { IsInt, IsNotEmpty, IsNumber, IsString, IsEnum, MinLength, Min, Max, IsMobilePhone } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { GenderEnum } from '@/enums'

import { Type } from 'class-transformer'

export class CreateUserDTO {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码最少6位' })
  password: string

  @ApiPropertyOptional({ description: '性别' })
  @IsEnum(GenderEnum, { message: '性别枚举值不正确' })
  gender: number

  @ApiPropertyOptional({ description: '年龄' })
  @IsInt({ message: '年龄必须是整数' })
  @Min(1, { message: '最小值1' })
  @Max(100, { message: '最大值100' })
  age: number

  @ApiPropertyOptional({ description: '手机号' })
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' })
  mobile: string
}
