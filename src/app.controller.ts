import { Controller, Get, Post, UseGuards, Request, Body, HttpCode, UsePipes, ValidationPipe, Render } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthLoginDto } from './auth/auth-login.dto';
import { AuthService } from './auth/auth.service';
import { createUserDto } from './module/user/dto/createUser.dto';
import { UserService } from './module/user/user.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService
    ) {}
    
    @Get()
    @Render('index.hbs')
    rootsss() {
      return { message: 'Hello world!' };
    }
    @Post('login')
    login(@Body() loginAdminDto:AuthLoginDto) {
      return this.authService.login(loginAdminDto)
    }
  
    @Post('register')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createAdmin(@Body() userCreate: createUserDto){
        return await this.userService.create(userCreate);
    }
}
