import { Controller, Get, Post, UseGuards, Body, HttpCode,
UsePipes, ValidationPipe, Render, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthLoginDto } from './auth/auth-login.dto';
import { Auth } from './auth/auth.decorator';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { Roles } from './auth/roles/decorator';
import { Role } from './auth/roles/enum';
import { RolesGuard } from './auth/roles/guard';
import { createUserDto } from './module/user/dto/createUser.dto';
import { UserService } from './module/user/user.service';
import { Request, Response } from 'express';


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
    
    @Get()
    @Render('login')
    async loginUser() {
      return { message: 'hello' }; 
    }

    @HttpCode(200)
    @UseGuards(JwtStrategy)
    @Post('login')
    async login(@Req() req: Request, @Res() res: Response) {
      const cookie = this.authService.login(req.body);
      console.log(cookie)
      res.setHeader('Set-Cookie', await cookie);
      req.body.password = undefined;
      res.redirect('/index')
    }
  
    @Post('register')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createAdmin(@Body() userCreate: createUserDto){
        return await this.userService.create(userCreate);
    }
}
