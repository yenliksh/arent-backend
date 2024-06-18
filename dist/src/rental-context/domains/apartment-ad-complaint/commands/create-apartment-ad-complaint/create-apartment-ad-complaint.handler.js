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
exports.CreateApartmentAdComplaintHandler = void 0;
const apartment_ad_complaint_repository_1 = require("../../../../domain-repositories/apartment-ad-complaint/apartment-ad-complaint.repository");
const apartment_ad_complaint_entity_1 = require("../../domain/entities/apartment-ad-complaint.entity");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const create_apartment_ad_complaint_command_1 = require("./create-apartment-ad-complaint.command");
let CreateApartmentAdComplaintHandler = class CreateApartmentAdComplaintHandler {
    constructor(apartmentAdComplaintRepository) {
        this.apartmentAdComplaintRepository = apartmentAdComplaintRepository;
    }
    async execute(command) {
        const { input, userId } = command;
        const domainEntity = apartment_ad_complaint_entity_1.ApartmentAdComplaintEntity.create({ ...input, userId });
        const result = await this.apartmentAdComplaintRepository.save(domainEntity);
        return (0, oxide_ts_1.Ok)(result);
    }
};
CreateApartmentAdComplaintHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_apartment_ad_complaint_command_1.CreateApartmentAdComplaintCommand),
    __metadata("design:paramtypes", [apartment_ad_complaint_repository_1.ApartmentAdComplaintRepository])
], CreateApartmentAdComplaintHandler);
exports.CreateApartmentAdComplaintHandler = CreateApartmentAdComplaintHandler;
//# sourceMappingURL=create-apartment-ad-complaint.handler.js.map