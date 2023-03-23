import { ApiPropertyOptional } from '@nestjs/swagger'

import { BaseResult } from '@/constants'

import { UserSerialize } from '../serializes'

export class FindUsersResult extends BaseResult {
  @ApiPropertyOptional({ description: '返回数据', type: [UserSerialize] })
  data: any
}
