import { Item } from "src/module/items/entities/item.entity";
import { User } from "src/module/user/entity/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
@Entity('vote')
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    VoteQtt: number;

    @Column({ type: 'datetime'})
    created_time: Date
    
    @ManyToOne(()=>  Item, (item) => item.id)
    item: Item;

    @ManyToOne(()=>  User , (user ) => user.id)
    user: User;
}

