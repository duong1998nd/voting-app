import {
  Controller, Get, Post, UseGuards, Body, HttpCode,
  UsePipes, ValidationPipe, Render, Req, Res, Redirect
} from '@nestjs/common';
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
import RequestWithUser from './auth/requestWithUser.interface';
import { request } from 'http';
import { UserDecorator } from './module/user/decorator';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  @Get('/')
  @Render('index.ejs')
  rootsss() {
    return { message: 'Hello world!' };
  }

  @Get('log-in')
  @Render('login.ejs')
  async logInUser() {}

  @HttpCode(200)
  @UseGuards(JwtStrategy)
  @Post('log-in')
  @Redirect('/')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const cookie = this.authService.login(request.body);
    response.setHeader('Set-Cookie', await cookie);
    console.log(request.body)
    request.body.password = undefined;
    return {}
  }

  @Auth(Role.ADMIN)
  @Get('profile')
  async Info(@UserDecorator() user: any,@Res() res: Response) {
    res.render('index',{
      Info: user
    })
  }

  @Post('register')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createAdmin(@Body() userCreate: createUserDto) {
    return await this.userService.create(userCreate);
  }

  @Get('log-out')
  async logout(){
    return await this.authService.getCookieForLogOut()
  }
}
