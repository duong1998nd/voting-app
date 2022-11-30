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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const updateUser_dto_1 = require("./dto/updateUser.dto");
const loginUser_dto_1 = require("./dto/loginUser.dto");
const createUser_dto_1 = require("./dto/createUser.dto");
const user_service_1 = require("./user.service");
const path_1 = require("path");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return this.userService.findAll();
    }
    rootsss() {
        return { message: 'hello' };
    }
    findOne(id) {
        return this.userService.findOneById(id);
    }
    create(createUserDto, file) {
        createUserDto.image = file.filename;
        return this.userService.create(createUserDto);
    }
    async register(UserCreate) {
        return this.userService.create(UserCreate);
    }
    remove(id) {
        return this.userService.remove(+id);
    }
    updateUser(id, updateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }
    login(info) {
        return this.userService.login(info);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/create'),
    (0, common_1.Render)('create.ejs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "rootsss", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.createUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.createUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateUser_dto_1.updateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUser_dto_1.loginUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, common_1.Controller)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map