import { Controller, Get, Post, UseGuards, Request, Body, HttpCode, UsePipes, ValidationPipe, Render } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthLoginDto } from './auth/auth-login.dto';
import { Auth } from './auth/auth.decorator';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './auth/roles/decorator';
import { Role } from './auth/roles/enum';
import { RolesGuard } from './auth/roles/guard';
import { createUserDto } from './module/user/dto/createUser.dto';
import { UserService } from './module/user/user.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService
    ) {}
    
    @Roles(Role.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/')
    @Render('index.ejs')
    rootsss() {
      return { message: 'Hello world!' };
    }
    
    
    @Post('login')
    login(@Body() loginDto:AuthLoginDto) {

      return this.authService.login(loginDto)
    }
  
    @Post('register')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createAdmin(@Body() userCreate: createUserDto){
        return await this.userService.create(userCreate);
    }
}
