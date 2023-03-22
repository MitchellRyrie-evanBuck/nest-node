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
import { Tags } from './tags.entity';
@Entity()
export class LoginGurad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  desc: string;

  @Generated('uuid')
  uuid: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @OneToMany(() => Tags, (tags) => tags.user)
  tags: Tags[];
  // example: example
}
export class Login {}
