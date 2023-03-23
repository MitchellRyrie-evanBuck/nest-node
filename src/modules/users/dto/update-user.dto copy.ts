import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsInt, IsMobilePhone, Max, Min } from 'class-validator'

import { GenderEnum } from '@/enums'

export class UpdateUserDTO {
  @ApiPropertyOptional({ description: '性别' })
  @IsEnum(GenderEnum, { message: '性别枚举值不正确' })
  gender: number

  @ApiPropertyOptional({ description: '年龄' })
  @IsInt({ message: '年龄必须是整数' })
  @Min(1, { message: '最小值1' })
  @Max(150, { message: '最大值150' })
  age: number

  @ApiPropertyOptional({ description: '手机号' })
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' })
  mobile: string
}
