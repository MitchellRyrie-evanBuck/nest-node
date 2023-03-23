import { ApiPropertyOptional } from '@nestjs/swagger'

export class BaseResult {
  @ApiPropertyOptional({ description: '时间戳' })
  timestamp: string

  @ApiPropertyOptional({ description: '状态码' })
  status: number

  @ApiPropertyOptional({ description: '消息' })
  message: string

  @ApiPropertyOptional({ description: '返回数据' })
  data: any
}
