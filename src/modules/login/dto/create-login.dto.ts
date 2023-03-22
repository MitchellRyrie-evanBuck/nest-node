import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateLoginDto {
  @ApiProperty({ description: '姓名', example: '小满' })
  @IsNotEmpty() //验证是否为空
  @IsString() //是否为字符串
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: '年龄' })
  @IsNumber() //是否为字符串
  age: number;

  @IsNotEmpty()
  @ApiProperty({ description: '密码' })
  @IsString() //是否为字符串
  password: number;
}
