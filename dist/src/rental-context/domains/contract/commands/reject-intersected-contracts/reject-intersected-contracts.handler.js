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
exports.RejectIntersectedContractsHandler = void 0;
const contract_orm_mapper_1 = require("../../../../domain-repositories/contract/contract.orm-mapper");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const contract_entity_1 = require("../../domain/entities/contract.entity");
const enums_1 = require("../../../../../infrastructure/enums");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const types_1 = require("../../../../../modules/graphql-subscriptions/types");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cqrs_1 = require("@nestjs/cqrs");
const reject_intersected_contracts_command_1 = require("./reject-intersected-contracts.command");
let RejectIntersectedContractsHandler = class RejectIntersectedContractsHandler {
    constructor(contractRepository, pubSubService, configService) {
        this.contractRepository = contractRepository;
        this.pubSubService = pubSubService;
        this.configService = configService;
        this.isProd = this.configService.get('nodeEnv') === 'production';
    }
    async execute(command) {
        const { concludedContractId } = command;
        const concludedContract = await this.contractRepository.findOneById(concludedContractId.value);
        if (!concludedContract ||
            ![enums_1.ContractStatus.CONCLUDED, enums_1.ContractStatus.COMPLETED].includes(concludedContract.status.value)) {
            throw new common_1.NotFoundException('Contract not found');
        }
        const contractsNeedToCancel = await this.contractRepository.findManyForReject({
            apartmentAdId: concludedContract.apartmentAdIdOrFail.value,
            apartmentRentPeriodType: concludedContract.apartmentRentPeriodType,
            from: concludedContract.arrivalDateOrFail,
            to: concludedContract.departureDateOrFail,
        });
        await Promise.all(contractsNeedToCancel.map((contract) => {
            contract.reject();
            return this.contractRepository.save(contract);
        }));
        contractsNeedToCancel.forEach((contract) => this.publishContract(contract, types_1.ContractPubSubEvent.UPDATED));
    }
    async publishContract(contract, event, error) {
        const mapper = new contract_orm_mapper_1.ContractOrmMapper(contract_entity_1.ContractEntity);
        const ormContract = await mapper.toOrmEntity(contract);
        await this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.UPDATE_CONTRACT, {
            contract: ormContract,
            event,
            error: this.isProd ? undefined : error,
        });
    }
};
RejectIntersectedContractsHandler = __decorate([
    (0, cqrs_1.CommandHandler)(reject_intersected_contracts_command_1.RejectIntersectedContractsCommand),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        pub_sub_service_1.PubSubService,
        config_1.ConfigService])
], RejectIntersectedContractsHandler);
exports.RejectIntersectedContractsHandler = RejectIntersectedContractsHandler;
//# sourceMappingURL=reject-intersected-contracts.handler.js.map