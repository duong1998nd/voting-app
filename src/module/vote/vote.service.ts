import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VoteService {
  constructor(
    private VoteRepo: Repository<Vote>,

  ) {}
  create(createVoteDto: CreateVoteDto) {
    return 'This action adds a new vote';
  }

  async findAll(): Promise<Vote[]> {
    return await this.VoteRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
