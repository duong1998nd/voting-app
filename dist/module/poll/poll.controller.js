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
exports.PollController = void 0;
const common_1 = require("@nestjs/common");
const poll_service_1 = require("./poll.service");
const update_poll_dto_1 = require("./dto/update-poll.dto");
const create_new_poll_dto_1 = require("./dto/create-new-poll.dto");
let PollController = class PollController {
    constructor(pollService) {
        this.pollService = pollService;
    }
    create(createPollDto) {
        return this.pollService.create(createPollDto);
    }
    findAll() {
        return this.pollService.findAll();
    }
    findOne(id) {
        return this.pollService.findOne(+id);
    }
    update(id, updatePollDto) {
        return this.pollService.update(+id, updatePollDto);
    }
    remove(id) {
        return this.pollService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_new_poll_dto_1.CreatePollDto]),
    __metadata("design:returntype", void 0)
], PollController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PollController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PollController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_poll_dto_1.UpdatePollDto]),
    __metadata("design:returntype", void 0)
], PollController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PollController.prototype, "remove", null);
PollController = __decorate([
    (0, common_1.Controller)('poll'),
    __metadata("design:paramtypes", [poll_service_1.PollService])
], PollController);
exports.PollController = PollController;
//# sourceMappingURL=poll.controller.js.map