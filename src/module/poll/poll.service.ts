import { Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-new-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from './entity/poll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult,DeleteResult } from 'typeorm';

@Injectable()  
export class PollService {
  constructor(
    @InjectRepository(Poll)
    private PollsRepository: Repository<Poll>,
  ) {}
  create(createPollDto: CreatePollDto): Promise<Poll> {
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
