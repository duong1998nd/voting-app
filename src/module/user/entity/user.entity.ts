import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Vote } from '../../vote/entities/vote.entity';
import { UserRoles } from '../enum/user.enum';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', default: '0' })
  money: string;

  @OneToMany(()=> Vote, (vote) => vote.id)
  vote: Vote[];

  @Column({ type: 'datetime',   default: () => 'NOW()' })
  created_at: Date; 

  @Column({ type: 'datetime', nullable: true })
  update_at: Date;

  @Column({ type: 'datetime', nullable: true })
  delete_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

}
