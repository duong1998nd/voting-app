import { Item } from "src/module/items/entities/item.entity";
import { User } from "src/module/user/entity/user.entity";
export declare class Vote {
    id: number;
    created_time: Date;
    item: Item;
    user: User;
}
