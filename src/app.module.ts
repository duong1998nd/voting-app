import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { AdminModule } from './module/admin/admin.module';
import { PollModule } from './module/poll/poll.module';
import { VoteModule } from './module/vote/vote.module';
import { ItemsModule } from './module/items/items.module';

@Module({
  imports: [UserModule, AdminModule, PollModule, TypeOrmModule.forRoot(typeormConfig), ItemsModule, VoteModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
