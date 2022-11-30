import { Repository, UpdateResult } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
export declare class ItemService {
    private itemRepository;
    constructor(itemRepository: Repository<Item>);
    create(createItemDto: CreateItemDto): Promise<Item>;
    findAll(): Promise<Item[]>;
    findOne(id: number): Promise<Item>;
    update(id: number, updateItemDto: UpdateItemDto): Promise<UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
