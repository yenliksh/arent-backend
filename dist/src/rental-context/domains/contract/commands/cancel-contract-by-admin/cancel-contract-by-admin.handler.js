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
exports.CancelContractByAdminHandler = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const cancel_concluded_contract_command_1 = require("../cancel-concluded-contract/cancel-concluded-contract.command");
const cancel_contract_by_admin_command_1 = require("./cancel-contract-by-admin.command");
let CancelContractByAdminHandler = class CancelContractByAdminHandler {
    constructor(contractRepository, commandBus) {
        this.contractRepository = contractRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { contractId, adminCancelMeta, trigger } = command.props;
        const contract = await this.contractRepository.findOneById(contractId.value);
        if (!contract) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Contract not found'));
        }
        contract.setPending();
        await this.contractRepository.save(contract);
        const result = await this.commandBus.execute(new cancel_concluded_contract_command_1.CancelConcludedContractCommand({ contractId, trigger, adminCancelMeta }));
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return (0, oxide_ts_1.Ok)(contract.id);
    }
};
CancelContractByAdminHandler = __decorate([
    (0, cqrs_1.CommandHandler)(cancel_contract_by_admin_command_1.CancelContractByAdminCommand),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository, cqrs_1.CommandBus])
], CancelContractByAdminHandler);
exports.CancelContractByAdminHandler = CancelContractByAdminHandler;
//# sourceMappingURL=cancel-contract-by-admin.handler.js.map