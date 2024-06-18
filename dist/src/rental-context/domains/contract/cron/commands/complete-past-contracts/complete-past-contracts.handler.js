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
exports.CompletePastContractHandler = void 0;
const contract_repository_1 = require("../../../../../domain-repositories/contract/contract.repository");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const complete_past_contracts_command_1 = require("./complete-past-contracts.command");
let CompletePastContractHandler = class CompletePastContractHandler {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    async execute() {
        const contracts = await this.contractRepository.findCompletedPastContracts();
        contracts.map((contract) => {
            contract.completePast();
        });
        await this.contractRepository.saveMany(contracts);
        return (0, oxide_ts_1.Ok)(true);
    }
};
CompletePastContractHandler = __decorate([
    (0, cqrs_1.CommandHandler)(complete_past_contracts_command_1.CompletePastContractsCommand),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository])
], CompletePastContractHandler);
exports.CompletePastContractHandler = CompletePastContractHandler;
//# sourceMappingURL=complete-past-contracts.handler.js.map