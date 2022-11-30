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
exports.ItemController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const create_item_dto_1 = require("./dto/create-item.dto");
const update_item_dto_1 = require("./dto/update-item.dto");
const items_service_1 = require("./items.service");
let ItemController = class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }
    findAll() {
        return this.itemService.findAll();
    }
    rootsss() {
        return { message: 'hello' };
    }
    findOne(id) {
        return this.itemService.findOne(+id);
    }
    create(createitemDto, file) {
        createitemDto.image = file.filename;
        console.log(createitemDto);
        return this.itemService.create(createitemDto);
    }
    update(id, updateItemDto) {
        return this.itemService.update(+id, updateItemDto);
    }
    remove(id) {
        return this.itemService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/create'),
    (0, common_1.Render)('create-item.ejs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "rootsss", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.HttpCode)(200),
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
    __metadata("design:paramtypes", [create_item_dto_1.CreateItemDto, Object]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "remove", null);
ItemController = __decorate([
    (0, common_1.Controller)('item'),
    __metadata("design:paramtypes", [items_service_1.ItemService])
], ItemController);
exports.ItemController = ItemController;
//# sourceMappingURL=items.controller.js.map