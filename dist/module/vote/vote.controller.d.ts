import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
export declare class VoteController {
    private readonly voteService;
    constructor(voteService: VoteService);
    create(createVoteDto: CreateVoteDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateVoteDto: UpdateVoteDto): string;
    remove(id: string): string;
}
