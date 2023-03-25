import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, IsMobilePhone } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: '手机号，唯一',
    example: '13049153466',
  })
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly mobile: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;

  @ApiProperty({
    description: '验证码',
    example: 'asdf',
  })
  @IsNotEmpty({ message: '请输入验证码' })
  readonly code: string;
}
