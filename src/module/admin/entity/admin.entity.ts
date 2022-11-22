import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
  } from 'typeorm';
  
  @Entity('admin')
  export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar' })
    name: string;
  
    @Column({ type: 'varchar' })
    email: string;
  
    @Column({ type: 'varchar' })
    password: string;
  
    @Column({ type: 'datetime',   default: () => 'NOW()' })
    created_at: Date; 
  
    @Column({ type: 'datetime', nullable: true })
    update_at: Date;
  
    @Column({ type: 'datetime', nullable: true })
    delete_t: Date;
  }
  