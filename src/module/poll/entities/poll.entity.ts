import { Item } from "src/module/items/entities/item.entity";
import { User } from "src/module/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm"

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column()
  start: Date;
  
  @Column()
  end: Date; 

  @Column()
  userId: number;

  @Column({ type: 'datetime',   default: () => 'NOW()' })
  created_at: Date; 
 
  @Column({ type: 'datetime', nullable: true })
  update_at: Date;

  @Column({ type: 'datetime', nullable: true })
  delete_at: Date;
   
  @ManyToOne(() => User, user => user.poll)
  user: User;

  @OneToMany(()=> Item, (item) => item.id)
  item: Item[];
  
}