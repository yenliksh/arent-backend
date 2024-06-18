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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const S3 = require("aws-sdk/clients/s3");
const cloud_files_storage_types_1 = require("../cloud-files-storage.types");
let S3Service = class S3Service {
    constructor(options) {
        this.options = options;
        this._client = this.createS3FromOptions();
    }
    createS3FromOptions() {
        return new S3({
            signatureVersion: 'v4',
            region: this.options.region,
            credentials: {
                accessKeyId: this.options.accessKeyId,
                secretAccessKey: this.options.secretAccessKey,
            },
            endpoint: this.options.endpoint,
        });
    }
    get client() {
        return this._client;
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cloud_files_storage_types_1.CLOUD_FILES_STORAGE_OPTIONS_PROVIDER_NAME)),
    __metadata("design:paramtypes", [Object])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map