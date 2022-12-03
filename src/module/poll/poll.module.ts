import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { ScheduleModule } from '@nestjs/schedule';


import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './entity/poll.entity';
import { VoteModule } from '../vote/vote.module';
@Module({
  imports: [TypeOrmModule.forFeature([Poll]),
    ScheduleModule.forRoot(),
    VoteModule
  ],
  controllers: [PollController],
  providers: [PollService]
})
export class PollModule {}
