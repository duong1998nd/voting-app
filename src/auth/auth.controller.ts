import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './auth-login.dto';
  import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
  
  @ApiTags('Auth')
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    // @UseGuards(LocalAuthGuard)
    // @Post('login')
    // async login(@Request() req, @Body() loginDto: AuthLoginDto): Promise<any> {
    //   return this.authService.generateToken(req.user);
    // }
  
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Request() req): Promise<any> {
      return req.user;
    }
  }
  