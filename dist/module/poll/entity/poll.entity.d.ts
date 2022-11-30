import { Item } from "src/module/items/entities/item.entity";
export declare class Poll {
    id: number;
    name: string;
    start: Date;
    end: Date;
    status: number;
    created_at: Date;
    update_at: Date;
    delete_at: Date;
    item: Item[];
}
