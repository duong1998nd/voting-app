import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,UsePipes,ValidationPipe, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { PollService } from './poll.service';
import { UpdatePollDto } from './dto/update-poll.dto';
import { CreatePollDto } from './dto/create-new-poll.dto';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/enum';
import { skip, take } from 'rxjs';
import { Roles } from 'src/auth/roles/decorator';
import { ErrorResponse } from '../user/share/errorResponse';
import { Poll } from './entities/poll.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Auth(Role.ADMIN)
  @Post('/create')
  @HttpCode(200) 
  @UsePipes(ValidationPipe)
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollService.create(createPollDto);
  }

  @Get('')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(4), ParseIntPipe) limit: number = 5): Promise<Pagination<Poll>> {

      limit = limit > 100 ? 100 : limit;
      return this.pollService.paginate({
        page,
        limit
      });
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
    return this.pollService.deletePoll(+id);
  }
}
