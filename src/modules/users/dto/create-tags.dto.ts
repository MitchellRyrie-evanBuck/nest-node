import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class CreateTagsDTO {
  @ApiProperty({ description: '用户ID' })
  @IsNotEmpty({ message: '用户ID不能为空' })
  id: string;

  @ApiProperty({ description: 'tags 项' })
  tags?: Array<string>;
}