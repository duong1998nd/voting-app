import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from './entity/admin.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    controllers: [ AdminController ],
    providers: [AdminService],
})
export class AdminModule {
}