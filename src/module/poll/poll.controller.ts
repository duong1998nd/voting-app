import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,UsePipes,ValidationPipe, Query } from '@nestjs/common';
import { PollService } from './poll.service';
import { UpdatePollDto } from './dto/update-poll.dto';
import { CreatePollDto } from './dto/create-new-poll.dto';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/enum';
import { skip, take } from 'rxjs';
import { Roles } from 'src/auth/roles/decorator';
import { ErrorResponse } from '../user/share/errorResponse';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Auth(Role.ADMIN)
  @Post()
  @HttpCode(200) 
  @UsePipes(ValidationPipe)
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollService.create(createPollDto);
  }

  @Get('')
  findAll(@Query() {take, skip}) {
    return this.pollService.findAll(take, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pollService.findOne(+id);
  }


  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePollDto: UpdatePollDto) {
    return this.pollService.update(+id, updatePollDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, userId: number) {
    return this.pollService.deletePoll(+userId, +id);
  }
}
