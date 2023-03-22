import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  Generated,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { LoginGurad } from './login.entity';
@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tags: string;

  @ManyToOne(() => LoginGurad, (user) => user.tags)
  @JoinColumn()
  user: LoginGurad;
}
