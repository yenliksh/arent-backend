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
exports.FindApartmentAdIdentificatorService = void 0;
const apartment_ad_identificator_repository_1 = require("../../../../domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository");
const apartment_ad_identificator_orm_entity_1 = require("../../../../../infrastructure/database/entities/apartment-ad-identificator.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let FindApartmentAdIdentificatorService = class FindApartmentAdIdentificatorService {
    constructor(apartmentAdIdentificatorRepository) {
        this.apartmentAdIdentificatorRepository = apartmentAdIdentificatorRepository;
    }
    async handle(dto) {
        const { id } = dto;
        const apartmentAd = await this.apartmentAdIdentificatorRepository.findOneBySearchId(id);
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        return (0, oxide_ts_1.Ok)(apartmentAd);
    }
    async handleByApId(dto) {
        const { id } = dto;
        const apartmentAd = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query().findOne({ apartmentId: id });
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        return (0, oxide_ts_1.Ok)(apartmentAd);
    }
    async handleByApIds(dto) {
        const { ids } = dto;
        const apartmentAds = await this.apartmentAdIdentificatorRepository.findManyByApartmentIds(ids);
        if (!apartmentAds) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ads not found'));
        }
        return (0, oxide_ts_1.Ok)(apartmentAds);
    }
};
FindApartmentAdIdentificatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [apartment_ad_identificator_repository_1.ApartmentAdIdentificatorRepository])
], FindApartmentAdIdentificatorService);
exports.FindApartmentAdIdentificatorService = FindApartmentAdIdentificatorService;
//# sourceMappingURL=find-apartment-ad-identificator.service.js.map