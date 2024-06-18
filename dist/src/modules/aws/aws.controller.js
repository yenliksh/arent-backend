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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsController = void 0;
const openapi = require("@nestjs/swagger");
const iam_decorator_1 = require("../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../infrastructure/guards");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const s3_dto_1 = require("./s3/s3.dto");
const s3_service_1 = require("./s3/s3.service");
let AwsController = class AwsController {
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async getSignedUrl(getSignedUrlDto, userId) {
        return this.s3Service.getSignedUrl(userId, getSignedUrlDto);
    }
    async deleteFromS3(deleteFromS3Dto, userId) {
        return this.s3Service.deleteFromS3(userId, deleteFromS3Dto);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Signed Url',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: String,
    }),
    (0, common_1.Get)('signed-url'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, iam_decorator_1.IAM)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [s3_dto_1.GetSignedUrlDto, Object]),
    __metadata("design:returntype", Promise)
], AwsController.prototype, "getSignedUrl", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete From S3',
    }),
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, common_1.Delete)('delete-s3-file'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, iam_decorator_1.IAM)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [s3_dto_1.DeleteFromS3Dto, Object]),
    __metadata("design:returntype", Promise)
], AwsController.prototype, "deleteFromS3", null);
AwsController = __decorate([
    (0, common_1.Controller)('v1/aws'),
    (0, swagger_1.ApiTags)('S3'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [s3_service_1.S3Service])
], AwsController);
exports.AwsController = AwsController;
//# sourceMappingURL=aws.controller.js.map