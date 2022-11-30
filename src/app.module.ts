import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { PollModule } from './module/poll/poll.module';
import { VoteModule } from './module/vote/vote.module';
import { ItemModule } from './module/items/items.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [UserModule, PollModule, TypeOrmModule.forRoot(typeormConfig), ItemModule, VoteModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
