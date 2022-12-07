import { Injectable, Logger } from '@nestjs/common';
import { CreatePollDto } from './dto/create-new-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from './entities/poll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UpdateResult,DeleteResult } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ErrorResponse } from '../user/share/errorResponse';
import { errorMessage } from '../user/share/errorMessage';
import { redis } from 'src/redis';
import { Item } from '../items/entities/item.entity';
import { Vote } from '../vote/entities/vote.entity';

@Injectable()  
export class PollService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollsRepository: Repository<Poll>,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,

    private schedulerRegistry: SchedulerRegistry,
  ) {}
  // create(createPollDto: CreatePollDto): Promise<Poll> {
  //   return this.pollsRepository.save(createPollDto);
  // }
  // voteQueryBuilder() {
  //   return this.dataSource
  //       .getRepository(Poll)
  //       .createQueryBuilder()
  // }
  private readonly logger = new Logger(PollService.name);
    async create(createPollDto: CreatePollDto): Promise<Poll> {
    
    const job_start = new CronJob(new Date(createPollDto.start), () => {
      this.logger.warn(`Cuộc bình chọn ${createPollDto.name} sẽ bắt đầu lúc (${new Date(createPollDto.start)})!`);      
    });  

    await this.schedulerRegistry.addCronJob(createPollDto.name, job_start);
    await job_start.start();

    await this.logger.warn(
      `job ${createPollDto.name} added for each minute at ${new Date(createPollDto.start)} seconds!`,
    );


    const job_end = new CronJob(new Date(createPollDto.end), () => {
       this.logger.warn(`Cuộc bình chọn ${createPollDto.name} sẽ kết thúc lúc (${new Date(createPollDto.end)})!`)
       job_end.stop();
    });
    
    await job_end.start();

    await this.logger.warn(
      `job ${createPollDto.name} stoped for each minute at ${new Date(createPollDto.end)} seconds!`,

    );

    const jobs = this.schedulerRegistry.getCronJobs();
     jobs.forEach((value, key, map) => {
        let next;
        try {
          next = value.nextDates().toJSDate();
        } catch (e) {
          next = 'error: next fire date is in the past!';
        }
        this.logger.log(`job: ${key} -> next: ${next}`);
      });
    return this.pollsRepository.save(createPollDto);
  }


  async vote(
    itemId: number,
    userId: string,
  ): Promise<Boolean | ErrorResponse[]> {
    const item = await this.itemsRepository.findOne({
      relations: ['poll'],
      where: { id: itemId },
    });
    if (
      (await item.poll).start.getTime() > new Date().getTime() ||
      (await item.poll).end.getTime() < new Date().getTime()
    ) {
      return errorMessage('poll', 'Không thể bình chọn lúc này');
    }

    const voted = await redis.sismember(
      `${itemId}${item.pollId}`,
      userId,
    );
    if (voted) {
      return false;
    }

    await this.voteRepository.insert(
      { 
        user: () => userId,
        item: item,
      }
    );

    await redis.sadd(`${itemId}${item.pollId}`, userId); // thêm gtri vào tập hợp
    return true;
  }

  // findAll(): Promise<Poll[]> {
  //   return this.pollsRepository.find();
  // }
  async findAll(take: number, skip: number): Promise<Poll[]> {
    console.log(take, skip)
    return this.pollsRepository
      .createQueryBuilder('poll')
      .innerJoinAndSelect('poll.item', 'item')
      .orderBy('poll.name', 'ASC')
      .take(take)
      .skip(skip)
      .getMany();
      
  }

  async findOne(id: number): Promise<Poll> {
    console.log(id);
    return await this.pollsRepository.findOne({
      where: { id },
      // relations: ['item'],
    });
  }
  // findOne(id: number) : Promise<Poll> {
  //   return this.pollsRepository.findOneBy({id});
  // }

  update(id: number, updatePollDto: UpdatePollDto): Promise<UpdateResult> {
    return this.pollsRepository.update(id, updatePollDto);
  }

  // remove(id: number): Promise<DeleteResult>{
  //   return this.pollsRepository.delete(id);
  // }
  async deletePoll(userId: number, id: number): Promise<Boolean> {
    try {
      await this.pollsRepository.delete({ id });

      await redis.srem(`${Item}${id}`, userId);
    } catch (err) {
      return false;
    }
    return true;
  }

  async myPoll(userId: number): Promise<Poll[]> {
    return await this.pollsRepository.find({ where: { userId } });
  }
}

