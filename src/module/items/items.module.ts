import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteModule } from '../vote/vote.module';
import { Item } from './entities/item.entity';
import { ItemController } from './items.controller';
import { ItemService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item]),
    VoteModule
],
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule {}
