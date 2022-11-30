import { PollService } from './poll.service';
import { UpdatePollDto } from './dto/update-poll.dto';
import { CreatePollDto } from './dto/create-new-poll.dto';
export declare class PollController {
    private readonly pollService;
    constructor(pollService: PollService);
    create(createPollDto: CreatePollDto): Promise<import("./entity/poll.entity").Poll>;
    findAll(): Promise<import("./entity/poll.entity").Poll[]>;
    findOne(id: string): Promise<import("./entity/poll.entity").Poll>;
    update(id: string, updatePollDto: UpdatePollDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
