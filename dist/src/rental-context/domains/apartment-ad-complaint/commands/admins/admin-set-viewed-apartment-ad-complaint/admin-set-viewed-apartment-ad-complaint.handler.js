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
exports.AdminViewedApartmentAdComplaintHandler = void 0;
const apartment_ad_complaint_repository_1 = require("../../../../../domain-repositories/apartment-ad-complaint/apartment-ad-complaint.repository");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const admin_set_viewed_apartment_ad_complaint_command_1 = require("./admin-set-viewed-apartment-ad-complaint.command");
let AdminViewedApartmentAdComplaintHandler = class AdminViewedApartmentAdComplaintHandler {
    constructor(apartmentAdComplaintRepository) {
        this.apartmentAdComplaintRepository = apartmentAdComplaintRepository;
    }
    async execute(command) {
        const { apartmentAdComplaintId } = command;
        const apartmentAdComplaint = await this.apartmentAdComplaintRepository.findOneById(apartmentAdComplaintId);
        if (!apartmentAdComplaint) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('ApartmentAdComplaint not found'));
        }
        apartmentAdComplaint.adminViewed();
        const result = await this.apartmentAdComplaintRepository.save(apartmentAdComplaint);
        return (0, oxide_ts_1.Ok)(result);
    }
};
AdminViewedApartmentAdComplaintHandler = __decorate([
    (0, cqrs_1.CommandHandler)(admin_set_viewed_apartment_ad_complaint_command_1.AdminSetViewedApartmentAdComplaintCommand),
    __metadata("design:paramtypes", [apartment_ad_complaint_repository_1.ApartmentAdComplaintRepository])
], AdminViewedApartmentAdComplaintHandler);
exports.AdminViewedApartmentAdComplaintHandler = AdminViewedApartmentAdComplaintHandler;
//# sourceMappingURL=admin-set-viewed-apartment-ad-complaint.handler.js.map