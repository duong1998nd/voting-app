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
exports.Item = void 0;
const typeorm_1 = require("typeorm");
const vote_entity_1 = require("../../vote/entities/vote.entity");
const poll_entity_1 = require("../../poll/entity/poll.entity");
let Item = class Item {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Item.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Item.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Item.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Item.prototype, "adress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "other", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Item.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint' }),
    __metadata("design:type", Number)
], Item.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => poll_entity_1.Poll, (poll) => poll.id),
    __metadata("design:type", poll_entity_1.Poll)
], Item.prototype, "poll", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vote_entity_1.Vote, (vote) => vote.id),
    __metadata("design:type", Array)
], Item.prototype, "vote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], Item.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Item.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Item.prototype, "delete_at", void 0);
Item = __decorate([
    (0, typeorm_1.Entity)()
], Item);
exports.Item = Item;
//# sourceMappingURL=item.entity.js.map