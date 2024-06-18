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
exports.CloudFilesStorageService = void 0;
const common_1 = require("@nestjs/common");
const cloud_files_storage_types_1 = require("../cloud-files-storage.types");
const s3_service_1 = require("./s3.service");
let CloudFilesStorageService = class CloudFilesStorageService {
    constructor(s3Service, options) {
        this.s3Service = s3Service;
        this.options = options;
    }
    _getBucketName(bucket) {
        if (bucket === 'public') {
            return this.options.publicBucket;
        }
        else {
            return this.options.privateBucket;
        }
    }
    async getSignedUrl(bucket, action, input) {
        const writeParams = {
            Bucket: this._getBucketName(bucket),
            Expires: action === 'putObject' ? this.options.putActionExpiresSec : this.options.getActionExpiresSec,
            Key: input.fileKey,
        };
        if (action === 'putObject' && input.contentType) {
            writeParams.ContentType = input.contentType;
        }
        return new Promise((resolve, reject) => {
            this.s3Service.client.getSignedUrl(action, writeParams, (err, url) => {
                if (err) {
                    return reject(err);
                }
                return resolve(url);
            });
        });
    }
    async headObject(filekey, bucket) {
        const Bucket = this._getBucketName(bucket);
        if (!Bucket)
            throw new Error('Bucket name is null');
        return new Promise((resolve, reject) => {
            this.s3Service.client.headObject({
                Bucket,
                Key: filekey,
            }, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
    async deleteObject(filekey, bucket) {
        const Bucket = this._getBucketName(bucket);
        if (!Bucket)
            throw new Error('Bucket name is null');
        return new Promise((resolve, reject) => {
            this.s3Service.client.deleteObject({
                Bucket,
                Key: filekey,
            }, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
};
CloudFilesStorageService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cloud_files_storage_types_1.CLOUD_FILES_STORAGE_OPTIONS_PROVIDER_NAME)),
    __metadata("design:paramtypes", [s3_service_1.S3Service, Object])
], CloudFilesStorageService);
exports.CloudFilesStorageService = CloudFilesStorageService;
//# sourceMappingURL=cloud-files-storage.service.js.map