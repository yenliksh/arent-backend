"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractCronModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../../domain-repositories/rental-context-domain-repositories.module");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const complete_past_contracts_handler_1 = require("./commands/complete-past-contracts/complete-past-contracts.handler");
const contract_cron_controller_1 = require("./controllers/contract-cron.controller");
const commands = [complete_past_contracts_handler_1.CompletePastContractHandler];
const controllers = [contract_cron_controller_1.ContractCronController];
let ContractCronModule = class ContractCronModule {
};
ContractCronModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule],
        providers: [...commands],
        controllers,
    })
], ContractCronModule);
exports.ContractCronModule = ContractCronModule;
//# sourceMappingURL=contract-cron.module.js.map