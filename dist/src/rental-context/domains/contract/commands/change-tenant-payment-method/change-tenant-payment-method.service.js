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
exports.ChangeTenantPaymentMethodService = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const innopay_card_repository_1 = require("../../../../domain-repositories/innopay-card/innopay-card.repository");
const types_1 = require("../../../innopay-card/domain/types");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let ChangeTenantPaymentMethodService = class ChangeTenantPaymentMethodService {
    constructor(contractRepository, innopayCardRepository) {
        this.contractRepository = contractRepository;
        this.innopayCardRepository = innopayCardRepository;
    }
    async handle(dto, userId) {
        var _a;
        const { cardId: newCardId, contractId } = dto;
        const [contract, isCardExist] = await Promise.all([
            this.contractRepository.findOneById(contractId),
            this.innopayCardRepository.isCardExist({
                cardId: newCardId,
                userId,
                appointmentType: types_1.InnopayAppointmentCardType.CHARGE_OFF,
            }),
        ]);
        if (!contract) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Contract not found'));
        }
        if (((_a = contract.tenant) === null || _a === void 0 ? void 0 : _a.value) !== userId) {
            return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentInvalidException('Change tenant payment method available for tenant only'));
        }
        if (!isCardExist) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Innopay card not found'));
        }
        const cardId = new uuid_value_object_1.UUID(newCardId);
        contract.setTenantPaymentMethod(cardId);
        await this.contractRepository.save(contract);
        return (0, oxide_ts_1.Ok)(cardId);
    }
};
ChangeTenantPaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        innopay_card_repository_1.InnopayCardRepository])
], ChangeTenantPaymentMethodService);
exports.ChangeTenantPaymentMethodService = ChangeTenantPaymentMethodService;
//# sourceMappingURL=change-tenant-payment-method.service.js.map