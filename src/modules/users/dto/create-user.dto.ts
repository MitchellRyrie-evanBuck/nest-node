
import { IsInt, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @Length(1, 10)
  @ApiProperty({ description: '姓名', example: 'admin' })
  @IsNotEmpty() //验证是否为空
  @IsString() //是否为字符串
  @Type(()=> String)
  name: string;

  @Length(1, 12)
  @IsNotEmpty()
  @ApiProperty({ description: '密码', example: 'test' })
  @IsString() //是否为字符串
  @Type(() => String)
  password: string;

  // @IsNotEmpty()
  // @ApiProperty({ description: '验证码' })
  // @IsString() //是否为字符串
  // code: string;
}
