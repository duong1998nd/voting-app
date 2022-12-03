import { Injectable, Logger } from '@nestjs/common';
import { CreatePollDto } from './dto/create-new-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from './entity/poll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult,DeleteResult } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()  
export class PollService {
  constructor(
    @InjectRepository(Poll)
    private PollsRepository: Repository<Poll>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  // create(createPollDto: CreatePollDto): Promise<Poll> {
  //   return this.PollsRepository.save(createPollDto);
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
    return this.PollsRepository.save(createPollDto);
  }

  findAll(): Promise<Poll[]> {
    return this.PollsRepository.find();
  }

  findOne(id: number) : Promise<Poll> {
    return this.PollsRepository.findOneBy({id});
  }

  update(id: number, updatePollDto: UpdatePollDto): Promise<UpdateResult> {
    return this.PollsRepository.update(id, updatePollDto);
  }

  remove(id: number): Promise<DeleteResult>{
    return this.PollsRepository.delete(id);
  }
}
