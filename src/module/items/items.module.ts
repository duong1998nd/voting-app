import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemController } from './items.controller';
import { ItemService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item]),
],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService, TypeOrmModule]
})
export class ItemModule {}
