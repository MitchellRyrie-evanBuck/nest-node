import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  Generated,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class UserGurad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Generated('uuid')
  uuid: string;

  @Column({ type: 'boolean', default: false })
  freeze: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

}