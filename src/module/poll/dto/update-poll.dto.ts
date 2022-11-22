import { PartialType } from '@nestjs/mapped-types';
import { CreatePollDto } from './create-new-poll.dto';

export class UpdatePollDto extends PartialType(CreatePollDto) {
    
}
