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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePollDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePollDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên không được để trống' }),
    (0, class_validator_1.Length)(2, 255),
    __metadata("design:type", String)
], CreatePollDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'chọn ngày bắt đầu' }),
    __metadata("design:type", Date)
], CreatePollDto.prototype, "start", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'chọn ngày kết thúc' }),
    __metadata("design:type", Date)
], CreatePollDto.prototype, "end", void 0);
exports.CreatePollDto = CreatePollDto;
//# sourceMappingURL=create-new-poll.dto.js.map