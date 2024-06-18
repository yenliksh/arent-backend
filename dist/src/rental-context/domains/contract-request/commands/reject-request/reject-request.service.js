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
exports.RejectRequestService = void 0;
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const contract_request_repository_1 = require("../../../../domain-repositories/contract-request/contract-request.repository");
let RejectRequestService = class RejectRequestService {
    constructor(contractRequestRepository) {
        this.contractRequestRepository = contractRequestRepository;
    }
    async handle(userId, dto) {
        const { contractRequestId, reason } = dto;
        const contractRequest = await this.contractRequestRepository.findOneWithUserId(contractRequestId, userId.value);
        if (!contractRequest) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException());
        }
        contractRequest.reject(reason);
        await this.contractRequestRepository.save(contractRequest);
        return (0, oxide_ts_1.Ok)(contractRequest.id);
    }
};
RejectRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_request_repository_1.ContractRequestRepository])
], RejectRequestService);
exports.RejectRequestService = RejectRequestService;
//# sourceMappingURL=reject-request.service.js.map