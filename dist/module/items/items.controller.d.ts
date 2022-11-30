/// <reference types="multer" />
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './items.service';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    findAll(): Promise<import("./entities/item.entity").Item[]>;
    rootsss(): {
        message: string;
    };
    findOne(id: string): Promise<import("./entities/item.entity").Item>;
    create(createitemDto: CreateItemDto, file: Express.Multer.File): Promise<import("./entities/item.entity").Item>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
