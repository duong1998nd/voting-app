import { Vote } from 'src/module/vote/entities/vote.entity';
import { Poll } from 'src/module/poll/entity/poll.entity';
export declare class Item {
    id: number;
    name: string;
    image: string;
    age: number;
    content: string;
    adress: string;
    other: string;
    phone: number;
    status: number;
    poll: Poll;
    vote: Vote[];
    created_at: Date;
    update_at: Date;
    delete_at: Date;
}
