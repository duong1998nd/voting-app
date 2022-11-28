import { Body, Controller, Get, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe, Patch, UseInterceptors, UploadedFile, Render } from '@nestjs/common';
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { createUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('User')
export class UserController {
    constructor(private userService: UserService){}
    @Get('/')
    getUsers(){
        return this.userService.findAll();
    }
    @Get('/create')
    @Render('create.hbs')
    rootsss() {
      return { message: 'hello' };
    }
    //get by id 
    @Get(':id')
    findOne(@Param('id') id:string ){
        return this.userService.findOneById(id);
    }
  
    @Post('/create')
    
    @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
              const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
              const ext = extname(file.originalname);
              const filename = `${uniqueSuffix}${ext}`;
              callback(null, filename);
            },
          }),
        }),
      )
      
    create(@Body() createUserDto: createUserDto,@UploadedFile() file: Express.Multer.File) {
        createUserDto.image = file.filename;
       
        return this.userService.create(createUserDto);
    }
    
    @Post('/create')
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
