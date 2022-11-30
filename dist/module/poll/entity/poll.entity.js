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
exports.Poll = void 0;
const item_entity_1 = require("../../items/entities/item.entity");
const typeorm_1 = require("typeorm");
let Poll = class Poll {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Poll.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Poll.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Poll.prototype, "start", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Poll.prototype, "end", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: () => 0 }),
    __metadata("design:type", Number)
], Poll.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], Poll.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Poll.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Poll.prototype, "delete_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.Item, (item) => item.id),
    __metadata("design:type", Array)
], Poll.prototype, "item", void 0);
Poll = __decorate([
    (0, typeorm_1.Entity)('poll')
], Poll);
exports.Poll = Poll;
//# sourceMappingURL=poll.entity.js.map