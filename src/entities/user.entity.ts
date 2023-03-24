import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { GenderEnum } from '@/enums'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  @Column({
    name: 'user_id',
    comment: '用户编号'
  })
  userId: string

  @Column({
    comment: '用户账号'
  })
  username: string

  @Column({
    comment: '用户密码'
  })
  password!: string

  @Column({
    nullable: true
  })
  gender: GenderEnum

  @Column({
    nullable: true
  })
  age: number

  @Column({
    nullable: true
  })
  mobile: string

  @CreateDateColumn({
    name: 'create_at',
    comment: '创建时间'
  })
  createAt: Date

  @UpdateDateColumn({
    name: 'update_at',
    comment: '更新时间'
  })
  updateAt: Date
}
