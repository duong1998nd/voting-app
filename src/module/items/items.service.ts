import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {
  }
  create(createItemDto: CreateItemDto): Promise<Item> {
    console.log(createItemDto)
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

  async vote(id:number){
    const item = await this.itemRepository.findOne({where: {id}})
    let vote = item.voteQtt ++
    if(vote > 0 && vote == 1){
      return await  this.itemRepository.save(item);
    }else{
      return 'không thành công'
    }
  }

  async updateVote(voteQttupdate:any, itemId:number){
    const voteQtt = await this.findOne(itemId)

    const voteQttnew = voteQtt.voteQtt + parseInt(voteQttupdate)
    return await this.itemRepository.update(itemId,{
      voteQtt: voteQttnew
    })
  }

}
