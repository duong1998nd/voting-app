import { Item } from "src/module/items/entities/item.entity";
import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vote {
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, Item => Item.votes)
    item: Item;

    @OneToOne(() => User, User => User.id)
    user: User;

}

