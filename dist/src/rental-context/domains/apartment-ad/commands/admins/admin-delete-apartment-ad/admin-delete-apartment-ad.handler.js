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
exports.AdminDeleteApartmentAdHandler = void 0;
const apartment_ad_repository_1 = require("../../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const long_term_rent_document_repository_1 = require("../../../../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository");
const short_term_rent_document_repository_1 = require("../../../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository");
const enums_1 = require("../../../../../../infrastructure/enums");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const contract_repository_1 = require("../../../../../domain-repositories/contract/contract.repository");
const admin_delete_apartment_ad_command_1 = require("./admin-delete-apartment-ad.command");
let AdminDeleteApartmentAdHandler = class AdminDeleteApartmentAdHandler {
    constructor(apartmentAdRepository, contractRepository, shortTermRentDocumentRepository, longTermRentDocumentRepository) {
        this.apartmentAdRepository = apartmentAdRepository;
        this.contractRepository = contractRepository;
        this.shortTermRentDocumentRepository = shortTermRentDocumentRepository;
        this.longTermRentDocumentRepository = longTermRentDocumentRepository;
    }
    async execute(command) {
        const { apartmentAdId } = command;
        const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        const contracts = await this.contractRepository.findManyActiveContracts(apartmentAd.id.value);
        if (contracts.some((contract) => contract.status.value === enums_1.ContractStatus.CONCLUDED ||
            contract.status.value === enums_1.ContractStatus.OFFERING ||
            contract.isPending)) {
            return (0, oxide_ts_1.Err)(new common_1.BadRequestException('Apartment in active rent'));
        }
        await Promise.all(contracts.map((contract) => {
            contract.reject(), this.contractRepository.save(contract);
        }));
        const result = await this.apartmentAdRepository.delete(apartmentAd);
        await this.removeFromElasticsearch(apartmentAd);
        return (0, oxide_ts_1.Ok)(result);
    }
    async removeFromElasticsearch(apartmentAd) {
        var _a, _b;
        if (apartmentAd.isLongTermRent && ((_a = apartmentAd.longTermRentStatus) === null || _a === void 0 ? void 0 : _a.isPublished)) {
            await this.longTermRentDocumentRepository.delete(apartmentAd);
        }
        if (apartmentAd.isShortTermRent && ((_b = apartmentAd.shortTermRentStatus) === null || _b === void 0 ? void 0 : _b.isPublished)) {
            await this.shortTermRentDocumentRepository.delete(apartmentAd);
        }
    }
};
AdminDeleteApartmentAdHandler = __decorate([
    (0, cqrs_1.CommandHandler)(admin_delete_apartment_ad_command_1.AdminDeleteApartmentAdCommand),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository,
        contract_repository_1.ContractRepository,
        short_term_rent_document_repository_1.ShortTermRentDocumentRepository,
        long_term_rent_document_repository_1.LongTermRentDocumentRepository])
], AdminDeleteApartmentAdHandler);
exports.AdminDeleteApartmentAdHandler = AdminDeleteApartmentAdHandler;
//# sourceMappingURL=admin-delete-apartment-ad.handler.js.map