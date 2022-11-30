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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const auth_login_dto_1 = require("./auth/auth-login.dto");
const auth_service_1 = require("./auth/auth.service");
const createUser_dto_1 = require("./module/user/dto/createUser.dto");
const user_service_1 = require("./module/user/user.service");
let AppController = class AppController {
    constructor(appService, authService, userService) {
        this.appService = appService;
        this.authService = authService;
        this.userService = userService;
    }
    rootsss() {
        return { message: 'Hello world!' };
    }
    login(loginAdminDto) {
        return this.authService.login(loginAdminDto);
    }
    async createAdmin(userCreate) {
        return await this.userService.create(userCreate);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index.ejs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "rootsss", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_dto_1.AuthLoginDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.createUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createAdmin", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        auth_service_1.AuthService,
        user_service_1.UserService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map