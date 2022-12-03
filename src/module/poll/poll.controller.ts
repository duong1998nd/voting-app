import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,UsePipes,ValidationPipe } from '@nestjs/common';
import { PollService } from './poll.service';
import { UpdatePollDto } from './dto/update-poll.dto';
import { CreatePollDto } from './dto/create-new-poll.dto';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/enum';

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
  findAll() {
    return this.pollService.findAll();
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
  remove(@Param('id') id: string) {
    return this.pollService.remove(+id);
  }
}
