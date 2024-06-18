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
exports.LongTermRentRequestsAdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const long_term_rent_requests_typeorm_repository_1 = require("./repositories/long-term-rent-requests.typeorm-repository");
let LongTermRentRequestsAdminService = class LongTermRentRequestsAdminService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
        this.repo = repo;
    }
};
LongTermRentRequestsAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(long_term_rent_requests_typeorm_repository_1.LongTermRentRequestsTypeormRepository)),
    __metadata("design:paramtypes", [long_term_rent_requests_typeorm_repository_1.LongTermRentRequestsTypeormRepository])
], LongTermRentRequestsAdminService);
exports.LongTermRentRequestsAdminService = LongTermRentRequestsAdminService;
//# sourceMappingURL=long-term-rent-requests-admin.service.js.map