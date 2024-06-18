"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchRepositoryBase = void 0;
const common_1 = require("@nestjs/common");
class ElasticsearchRepositoryBase {
    constructor(client, mapper, document) {
        this.client = client;
        this.mapper = mapper;
        this.document = document;
        this.logger = new common_1.Logger('ElasticsearchRepositoryBase');
    }
}
exports.ElasticsearchRepositoryBase = ElasticsearchRepositoryBase;
//# sourceMappingURL=elasticsearch.repository.base.js.map