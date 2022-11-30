import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
export declare class VoteService {
    create(createVoteDto: CreateVoteDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVoteDto: UpdateVoteDto): string;
    remove(id: number): string;
}
