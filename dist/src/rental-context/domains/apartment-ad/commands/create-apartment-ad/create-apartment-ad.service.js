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
exports.CreateApartmentAdService = void 0;
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const apartment_ad_entity_1 = require("../../domain/entities/apartment-ad.entity");
let CreateApartmentAdService = class CreateApartmentAdService {
    constructor(apartmentAdRepository) {
        this.apartmentAdRepository = apartmentAdRepository;
    }
    async handle(dto, userId) {
        const { rentPeriodType, longTermRentCost, shortTermRentCost } = dto;
        const domainEntity = apartment_ad_entity_1.ApartmentAdEntity.create({
            landlordId: new uuid_value_object_1.UUID(userId),
            rentPeriodType: rentPeriodType,
            longTermRentCost,
            shortTermRentCost,
        });
        const result = await this.apartmentAdRepository.save(domainEntity);
        return (0, oxide_ts_1.Ok)(result);
    }
};
CreateApartmentAdService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository])
], CreateApartmentAdService);
exports.CreateApartmentAdService = CreateApartmentAdService;
//# sourceMappingURL=create-apartment-ad.service.js.map