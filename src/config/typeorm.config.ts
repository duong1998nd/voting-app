import { TypeOrmModuleOptions } from '@nestjs/typeorm';
    
export const typeormConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'votingApp',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
};