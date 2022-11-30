import { CreatePollDto } from './dto/create-new-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from './entity/poll.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
export declare class PollService {
    private PollsRepository;
    constructor(PollsRepository: Repository<Poll>);
    create(createPollDto: CreatePollDto): Promise<Poll>;
    findAll(): Promise<Poll[]>;
    findOne(id: number): Promise<Poll>;
    update(id: number, updatePollDto: UpdatePollDto): Promise<UpdateResult>;
    remove(id: number): Promise<DeleteResult>;
}
