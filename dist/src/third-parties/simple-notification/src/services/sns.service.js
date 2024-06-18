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
exports.SNSService = void 0;
const common_1 = require("@nestjs/common");
const SNS = require("aws-sdk/clients/sns");
const simple_notification_types_1 = require("../simple-notification.types");
let SNSService = class SNSService {
    constructor(options) {
        this.options = options;
        this._client = this.createS3FromOptions();
    }
    createS3FromOptions() {
        return new SNS({
            useAccelerateEndpoint: true,
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
SNSService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(simple_notification_types_1.SIMPLE_NOTIFICATION_OPTIONS_PROVIDER_NAME)),
    __metadata("design:paramtypes", [Object])
], SNSService);
exports.SNSService = SNSService;
//# sourceMappingURL=sns.service.js.map