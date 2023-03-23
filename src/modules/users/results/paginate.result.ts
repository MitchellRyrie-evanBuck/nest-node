import { ApiPropertyOptional } from '@nestjs/swagger'

import { BaseResult } from '@/constants'

import { PaginateSerialize } from '../serializes'

export class PaginateResult extends BaseResult {
  @ApiPropertyOptional({ description: '分页结果', type: PaginateSerialize })
  data: any
}
