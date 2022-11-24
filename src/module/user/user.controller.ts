import { Body, Controller, Get, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe, Patch } from '@nestjs/common';
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { createUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('User')
export class UserController {
    constructor(private userService: UserService){}
    @Get('/')
    getUsers(){
        return this.userService.findAll();
    }

    //get by id 
    @Get(':id')
    findOne(@Param('id') id:string ){
        return this.userService.findOneById(id);
    }

    @Post('')
    create(@Body() createUserDto: createUserDto) {
        return this.userService.create(createUserDto);
    }

    @Post('/')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async register(@Body() UserCreate: createUserDto){
        return this.userService.create(UserCreate)
    }

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.userService.remove(+id);

    }

    @Patch(':id')
    updateUser(@Param('id') id:number, @Body() updateUserDto:updateUserDto){
        return this.userService.update(+id, updateUserDto);
    }

    @Post('/login')
    login(@Body() info:loginUserDto){
        return this.userService.login(info)
    }
}
