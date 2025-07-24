

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';


@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, user => user.projects, { cascade: true })
  @JoinTable()
  users: User[];

  @Column()
  owner: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ default: 0 })
  stars: number;

  @Column({ default: 0 })
  forks: number;

  @Column({ default: 0 })
  openIssues: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
