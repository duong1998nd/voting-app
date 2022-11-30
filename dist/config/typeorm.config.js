"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormConfig = void 0;
exports.typeormConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'voting_app',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map