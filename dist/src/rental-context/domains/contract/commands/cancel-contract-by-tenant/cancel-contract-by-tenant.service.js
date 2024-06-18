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
exports.CancelContractByTenantService = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const types_1 = require("../../domain/types");
const iso_date_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/iso-date.value-object");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const cancel_concluded_contract_command_1 = require("../cancel-concluded-contract/cancel-concluded-contract.command");
let CancelContractByTenantService = class CancelContractByTenantService {
    constructor(contractRepository, commandBus) {
        this.contractRepository = contractRepository;
        this.commandBus = commandBus;
    }
    async handle(dto, tenantId) {
        const { contractId, departureDate } = dto;
        const contract = await this.contractRepository.findOne({ id: new uuid_value_object_1.UUID(contractId), tenantId: new uuid_value_object_1.UUID(tenantId) });
        if (!contract) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Contract not found'));
        }
        contract.setPending();
        await this.contractRepository.save(contract);
        const departureDateIso = departureDate ? new iso_date_value_object_1.DateISOVO(departureDate) : undefined;
        await this.manuallyCancellation(contract.id, departureDateIso);
        return (0, oxide_ts_1.Ok)(contract.id);
    }
    async manuallyCancellation(contractId, departureDate) {
        const result = await this.commandBus.execute(new cancel_concluded_contract_command_1.CancelConcludedContractCommand({
            contractId,
            trigger: types_1.CancellationTrigger.TENANT,
            checkOutDate: departureDate,
        }));
        if (result.isErr()) {
            throw result.unwrapErr();
        }
    }
};
CancelContractByTenantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository, cqrs_1.CommandBus])
], CancelContractByTenantService);
exports.CancelContractByTenantService = CancelContractByTenantService;
//# sourceMappingURL=cancel-contract-by-tenant.service.js.map