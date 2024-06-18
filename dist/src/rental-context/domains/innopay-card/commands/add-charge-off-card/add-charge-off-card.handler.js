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
exports.AddChargeOffCardHandler = void 0;
const innopay_card_repository_1 = require("../../../../domain-repositories/innopay-card/innopay-card.repository");
const innopay_card_entity_1 = require("../../domain/entities/innopay-card.entity");
const types_1 = require("../../domain/types");
const pan_masked_value_object_1 = require("../../domain/value-objects/pan-masked.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const cqrs_1 = require("@nestjs/cqrs");
const Sentry = require("@sentry/node");
const innopay_card_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-card.service");
const oxide_ts_1 = require("oxide.ts");
const add_charge_off_card_command_1 = require("./add-charge-off-card.command");
let AddChargeOffCardHandler = class AddChargeOffCardHandler {
    constructor(innopayCardService, innopayCardRepository) {
        this.innopayCardService = innopayCardService;
        this.innopayCardRepository = innopayCardRepository;
    }
    async execute(command) {
        const { trxId } = command;
        const { cnpCardId, cnpUserId, customerReference, userId } = command.props;
        const cardInfo = await this.innopayCardService.getCardInfo(cnpCardId, cnpUserId, customerReference);
        const cardType = cardInfo.cardType in types_1.InnopayCardType ? cardInfo.cardType : undefined;
        if (!cardType) {
            Sentry.captureException('Card type not in InnopayCardType enum');
            return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentNotProvidedException('Card type not in InnopayCardType enum'));
        }
        const innopayCard = innopay_card_entity_1.InnopayCardEntity.create({
            appointmentType: types_1.InnopayAppointmentCardType.CHARGE_OFF,
            cardHolder: cardInfo.cardHolder,
            cardType,
            cnpCardId,
            cnpUserId,
            panMasked: new pan_masked_value_object_1.PanMaskedVO(cardInfo.panMasked),
            userId,
        });
        await this.innopayCardRepository.save(innopayCard, trxId);
        return (0, oxide_ts_1.Ok)(innopayCard.id);
    }
};
AddChargeOffCardHandler = __decorate([
    (0, cqrs_1.CommandHandler)(add_charge_off_card_command_1.AddChargeOffCardCommand),
    __metadata("design:paramtypes", [innopay_card_service_1.InnopayCardService,
        innopay_card_repository_1.InnopayCardRepository])
], AddChargeOffCardHandler);
exports.AddChargeOffCardHandler = AddChargeOffCardHandler;
//# sourceMappingURL=add-charge-off-card.handler.js.map