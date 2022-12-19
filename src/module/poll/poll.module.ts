import { CacheModule, Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { ScheduleModule } from '@nestjs/schedule';


import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Item } from '../items/entities/item.entity';
import { Vote } from '../vote/entities/vote.entity';
import { PollGateway } from './poll.gateway';
@Module({
  imports: [TypeOrmModule.forFeature([Poll, Item, Vote]),
    ScheduleModule.forRoot(),
    CacheModule.register(),
  ],
  controllers: [PollController],
  providers: [PollService, PollGateway]
})
export class PollModule {}
