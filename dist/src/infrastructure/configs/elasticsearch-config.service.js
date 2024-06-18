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
exports.ElasticsearchConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = require("aws-sdk");
const createAwsElasticsearchConnector = require('aws-elasticsearch-connector');
let ElasticsearchConfigService = class ElasticsearchConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    async createElasticsearchOptions() {
        const awsConfig = new AWS.Config({
            accessKeyId: this.configService.get('elasticsearch.accessKey'),
            secretAccessKey: this.configService.get('elasticsearch.secretAccessKey'),
            region: this.configService.get('elasticsearch.region'),
        });
        return {
            ...createAwsElasticsearchConnector(awsConfig),
            node: this.configService.get('elasticsearch.node'),
        };
    }
};
ElasticsearchConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ElasticsearchConfigService);
exports.ElasticsearchConfigService = ElasticsearchConfigService;
//# sourceMappingURL=elasticsearch-config.service.js.map