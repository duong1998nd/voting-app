import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { jwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles/guard';
import { UserModule } from 'src/module/user/user.module';

@Module({
  imports: [
   PassportModule,
   UserModule,
   JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async () => ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1 hours'}
    })
 })
  ],
  providers: [AuthService, JwtStrategy, jwtAuthGuard, RolesGuard],
  exports: [AuthService]
})
export class AuthModule {}


