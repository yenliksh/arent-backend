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
exports.ChatsAdminController = void 0;
const openapi = require("@nestjs/swagger");
const guards_1 = require("../../../infrastructure/guards");
const types_1 = require("../../auth/types");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const chats_admin_service_1 = require("./chats-admin.service");
const chat_typeorm_entity_1 = require("./entities/chat.typeorm-entity");
let ChatsAdminController = class ChatsAdminController {
    constructor(service) {
        this.service = service;
    }
};
ChatsAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin-panel.Chats'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, crud_1.Crud)({
        model: {
            type: chat_typeorm_entity_1.ChatTypeormEntity,
        },
        query: {
            alwaysPaginate: true,
        },
        routes: {
            only: ['getManyBase', 'getOneBase'],
        },
        params: {
            id: {
                type: 'uuid',
                primary: true,
                field: 'id',
            },
        },
    }),
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)(types_1.TokenType.ADMIN)),
    (0, common_1.Controller)('admin-panel/chats'),
    __metadata("design:paramtypes", [chats_admin_service_1.ChatsAdminService])
], ChatsAdminController);
exports.ChatsAdminController = ChatsAdminController;
//# sourceMappingURL=chats-admin.controller.js.map