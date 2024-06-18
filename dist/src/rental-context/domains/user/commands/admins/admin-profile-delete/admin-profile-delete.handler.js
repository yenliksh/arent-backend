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
exports.AdminProfileDeleteHandler = void 0;
const apartment_ad_repository_1 = require("../../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const unit_of_work_1 = require("../../../../../../infrastructure/database/unit-of-work/unit-of-work");
const long_term_rent_document_repository_1 = require("../../../../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository");
const short_term_rent_document_repository_1 = require("../../../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository");
const contract_repository_1 = require("../../../../../domain-repositories/contract/contract.repository");
const user_repository_1 = require("../../../../../domain-repositories/user/user.repository");
const admin_profile_delete_command_1 = require("./admin-profile-delete.command");
let AdminProfileDeleteHandler = class AdminProfileDeleteHandler {
    constructor(userRepository, contractRepository, longTermRentDocumentRepository, shortTermRentDocumentRepository, unitOfWork, apartmentAdRepository) {
        this.userRepository = userRepository;
        this.contractRepository = contractRepository;
        this.longTermRentDocumentRepository = longTermRentDocumentRepository;
        this.shortTermRentDocumentRepository = shortTermRentDocumentRepository;
        this.unitOfWork = unitOfWork;
        this.apartmentAdRepository = apartmentAdRepository;
    }
    async execute(command) {
        const { userId } = command;
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('User not found'));
        }
        const trxId = await this.unitOfWork.start();
        try {
            const [apartmentAds, contracts] = await Promise.all([
                this.apartmentAdRepository.findMany({ landlordId: user.id }, trxId),
                this.contractRepository.findManyActiveContractsByUserId(user.id.value, trxId),
            ]);
            contracts.forEach((contract) => {
                contract.reject();
            });
            await this.contractRepository.saveMany(contracts, trxId);
            await this.userRepository.delete(user, trxId);
            await this.unitOfWork.commit(trxId);
            for (const apartmentAd of apartmentAds) {
                this.removeFromElasticsearch(apartmentAd);
            }
            return (0, oxide_ts_1.Ok)(user.id);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            throw error;
        }
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
AdminProfileDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(admin_profile_delete_command_1.AdminProfileDeleteCommand),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        contract_repository_1.ContractRepository,
        long_term_rent_document_repository_1.LongTermRentDocumentRepository,
        short_term_rent_document_repository_1.ShortTermRentDocumentRepository,
        unit_of_work_1.UnitOfWork,
        apartment_ad_repository_1.ApartmentAdRepository])
], AdminProfileDeleteHandler);
exports.AdminProfileDeleteHandler = AdminProfileDeleteHandler;
//# sourceMappingURL=admin-profile-delete.handler.js.map