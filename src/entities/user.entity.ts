import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import { GenderEnum } from '@/enums';
import { TagsEntity } from './tags.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({
    name: 'user_id',
    comment: '用户编号',
  })
  userId: string;

  @Column({
    comment: '用户账号',
  })
  username: string;

  @ManyToMany((type) => TagsEntity, (tags) => tags.tagname)
  @JoinTable()
  tags: TagsEntity[];

  // 软删除
  @Column({
    default: false,
  })
  isDelete: boolean;

  // 加密盐
  @Column('text', { select: false })
  salt: string;

  @Column({
    comment: '用户密码',
  })
  password!: string;

  @Column({
    nullable: true,
  })
  gender: GenderEnum;

  @Column({
    nullable: true,
  })
  age: number;

  @Column({
    nullable: true,
  })
  mobile: string;

  @CreateDateColumn({
    name: 'create_at',
    comment: '创建时间',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    comment: '更新时间',
  })
  updateAt: Date;
}
