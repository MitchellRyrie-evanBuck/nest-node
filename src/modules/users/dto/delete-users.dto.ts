import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty } from 'class-validator'

export class DeleteUsersDTO {
  @ApiProperty({ description: '编号数组' })
  @ArrayNotEmpty({ message: '编号数组不能为空' })
  ids: number[]
}
