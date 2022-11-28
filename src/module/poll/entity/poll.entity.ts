import { Item } from "src/module/items/entities/item.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"

@Entity('poll')
export class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'datetime'})
  start: Date;
  
  @Column({ type: 'datetime'})
  last: Date; 

  @Column({ type: 'tinyint', default: () => 0 })
  status: number;

  @Column({ type: 'datetime',   default: () => 'NOW()' })
  created_at: Date; 
 
  @Column({ type: 'datetime', nullable: true })
  update_at: Date;

  @Column({ type: 'datetime', nullable: true })
  delete_at: Date; 

  @OneToMany(()=> Item, (item) => item.id)
  item: Item[];
}