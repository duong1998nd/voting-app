"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entity/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(UserRepo) {
        this.UserRepo = UserRepo;
    }
    async findAll() {
        return await this.UserRepo.find();
    }
    async findOneById(id) {
        return await this.UserRepo.findBy({ id: +id });
    }
    async findLogin({ email, password }) {
        const userActive = await this.UserRepo.findOne({
            where: { email: email }
        });
        if (!userActive) {
            throw new common_1.HttpException("ko tìm thấy tài khoản", common_1.HttpStatus.UNAUTHORIZED);
        }
        const compare_pass = await bcrypt.compare(password, userActive.password);
        if (!compare_pass) {
            throw new common_1.HttpException("Đăng nhập thất bại", common_1.HttpStatus.UNAUTHORIZED);
        }
        return userActive;
    }
    async findOneByEmail(email) {
        return (await this.users).find(user => user.email === email);
    }
    async create(data) {
        data.password = await bcrypt.hash(data.password, 10);
        try {
            console.log(Object.assign({}, data));
            const user_bcrypt = await this.UserRepo.save(Object.assign({}, data));
            delete user_bcrypt.password;
            console.log(user_bcrypt);
            return user_bcrypt;
        }
        catch (error) {
            console.log(error);
            throw new Error('Nhập đẩy đủ thông tin');
        }
    }
    remove(id) {
        return this.UserRepo.delete(id);
    }
    async update(id, userUpdateDto) {
        return await this.UserRepo.update(+id, userUpdateDto);
    }
    async login(Dto) {
        const user = await this.UserRepo.findOne({
            where: {
                email: Dto.email,
            }
        });
        if (!user) {
            throw new Error(`thông tin tài khoản không chính xác`);
        }
        const pw = await bcrypt.compare(Dto.password, user.password);
        if (!pw) {
            throw new Error('thông tin tài khoản không chính xác');
        }
        delete user.password;
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map