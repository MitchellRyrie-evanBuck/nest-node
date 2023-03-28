import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tags')
export class TagsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({
    name: 'user_id',
    comment: 'tag编号',
  })
  userId: string;

  @Column({
    comment: 'tag名称',
  })
  tagname: string;

  // 软删除
  @Column({
    default: false,
  })
  isDelete: boolean;

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





