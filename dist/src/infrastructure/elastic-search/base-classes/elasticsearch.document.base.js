"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchDocumentBase = void 0;
const common_1 = require("@nestjs/common");
class ElasticsearchDocumentBase {
    constructor() {
        this.logger = new common_1.Logger('ElasticsearchDocumentBase');
    }
}
exports.ElasticsearchDocumentBase = ElasticsearchDocumentBase;
//# sourceMappingURL=elasticsearch.document.base.js.map