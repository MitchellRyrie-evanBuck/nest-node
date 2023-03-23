import { ApiPropertyOptional } from '@nestjs/swagger'

import { BaseResult } from '@/constants'

import { UserSerialize } from '../serializes'

export class FindUserResult extends BaseResult {
  @ApiPropertyOptional({ description: '用户数据', type: UserSerialize })
  data: any
}
