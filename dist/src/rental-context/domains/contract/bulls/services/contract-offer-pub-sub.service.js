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
exports.ContractOfferPubSubService = void 0;
const contract_orm_mapper_1 = require("../../../../domain-repositories/contract/contract.orm-mapper");
const message_orm_mapper_1 = require("../../../../domain-repositories/message/message.orm-mapper");
const contract_entity_1 = require("../../domain/entities/contract.entity");
const message_entity_1 = require("../../../message/domain/entities/message.entity");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ContractOfferPubSubService = class ContractOfferPubSubService {
    constructor(pubSubService, configService) {
        this.pubSubService = pubSubService;
        this.configService = configService;
        this.isProd = this.configService.get('nodeEnv') === 'production';
    }
    async publishMessage(message, chat) {
        const { members } = chat;
        const mapper = new message_orm_mapper_1.MessageOrmMapper(message_entity_1.MessageEntity);
        const ormMessage = await mapper.toOrmEntity(message);
        await this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.NEW_MESSAGE, {
            message: ormMessage,
            chatMembers: members
                .map((member) => ({ [member.memberId.value]: member.role }))
                .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        });
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
    async publishInnopayPageUrl(payingId, url, startUrlDate, refs) {
        await this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.INNOPAY_PAGE_URL, {
            payingId,
            url,
            startUrlDate: new Date(startUrlDate),
            ...refs,
        });
    }
};
ContractOfferPubSubService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pub_sub_service_1.PubSubService, config_1.ConfigService])
], ContractOfferPubSubService);
exports.ContractOfferPubSubService = ContractOfferPubSubService;
//# sourceMappingURL=contract-offer-pub-sub.service.js.map