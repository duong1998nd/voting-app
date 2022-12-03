import { CacheModule, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entity/user.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { ItemModule } from '../items/items.module';
import { VoteModule } from '../vote/vote.module';

@Module({
    imports: [MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forFeature([User]),
    VoteModule,
    ItemModule,
    CacheModule.register()
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy, AuthService, JwtService],
    exports: [UserService]
})
export class UserModule {
    
}
