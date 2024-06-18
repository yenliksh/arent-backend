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
exports.CreateApartmentAdIdentificatorService = void 0;
const apartment_ad_identificator_repository_1 = require("../../../../domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository");
const apartment_ad_identificator_entity_1 = require("../../domain/entities/apartment-ad-identificator.entity");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let CreateApartmentAdIdentificatorService = class CreateApartmentAdIdentificatorService {
    constructor(apartmentAdIdentificatorRepository) {
        this.apartmentAdIdentificatorRepository = apartmentAdIdentificatorRepository;
    }
    async handle(dto) {
        const { apartmentId, titleSeo } = dto;
        const isExist = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(apartmentId);
        if (isExist) {
            await this.apartmentAdIdentificatorRepository.updateByApartmentId(isExist.getPropsCopy().id.value, titleSeo);
        }
        else {
            const domainEntity = apartment_ad_identificator_entity_1.ApartmentAdIdentificatorEntity.create({
                apartmentId: new uuid_value_object_1.UUID(apartmentId),
                titleSeo,
            });
            await this.apartmentAdIdentificatorRepository.save(domainEntity);
        }
        return (0, oxide_ts_1.Ok)(new uuid_value_object_1.UUID(apartmentId));
    }
};
CreateApartmentAdIdentificatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [apartment_ad_identificator_repository_1.ApartmentAdIdentificatorRepository])
], CreateApartmentAdIdentificatorService);
exports.CreateApartmentAdIdentificatorService = CreateApartmentAdIdentificatorService;
//# sourceMappingURL=create-apartment-ad-identificator.service.js.map