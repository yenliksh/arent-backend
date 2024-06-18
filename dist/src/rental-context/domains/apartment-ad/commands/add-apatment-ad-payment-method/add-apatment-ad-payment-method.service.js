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
exports.AddApartmentAdPaymentMethodService = void 0;
const innopay_card_repository_1 = require("../../../../domain-repositories/innopay-card/innopay-card.repository");
const enums_1 = require("../../../../../infrastructure/enums");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
let AddApartmentAdPaymentMethodService = class AddApartmentAdPaymentMethodService {
    constructor(apartmentAdRepository, innopayCardRepository) {
        this.apartmentAdRepository = apartmentAdRepository;
        this.innopayCardRepository = innopayCardRepository;
    }
    async handle(dto, userId) {
        const { id, cardId } = dto;
        const isCardExist = await this.innopayCardRepository.isCardExist({ cardId, userId });
        if (!isCardExist) {
            throw new common_1.NotFoundException('Card cannot be found');
        }
        const apartmentAd = await this.apartmentAdRepository.findOne({
            id: new uuid_value_object_1.UUID(id),
            landlordId: new uuid_value_object_1.UUID(userId),
        });
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        apartmentAd.setPaymentMethod({ defaultType: enums_1.PaymentMethod.INNOPAY, innopayCardId: cardId });
        const result = await this.apartmentAdRepository.save(apartmentAd);
        return (0, oxide_ts_1.Ok)(result);
    }
};
AddApartmentAdPaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository,
        innopay_card_repository_1.InnopayCardRepository])
], AddApartmentAdPaymentMethodService);
exports.AddApartmentAdPaymentMethodService = AddApartmentAdPaymentMethodService;
//# sourceMappingURL=add-apatment-ad-payment-method.service.js.map