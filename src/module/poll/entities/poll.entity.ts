import { Item } from "src/module/items/entities/item.entity";
import { User } from "src/module/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm"

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({type: 'datetime'})
  start: Date;
  
  @Column({type: 'datetime'})
  end: Date; 

  @Column()
  userId: number;

  @Column({default: 0})
  status: boolean;

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