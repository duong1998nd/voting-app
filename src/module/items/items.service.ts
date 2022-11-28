import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>
  ) {
  }
  create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.save(createItemDto);
  }

  findAll() : Promise<Item[]> {
    return this.itemRepository.find();
  }

  findOne(id: number) : Promise<Item> {
    return this.itemRepository.findOneBy({ id });
  }

  update(id: number, updateItemDto: UpdateItemDto): Promise<UpdateResult> {
    return this.itemRepository.update(id, updateItemDto);
  }

  remove(id: number) {
    return this.itemRepository.delete({ id });
  }
}
