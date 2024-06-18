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
exports.SimpleEmailService = void 0;
const common_1 = require("@nestjs/common");
const ses_service_1 = require("./ses.service");
let SimpleEmailService = class SimpleEmailService {
    constructor(sesService) {
        this.sesService = sesService;
    }
    async sendEmail({ source, destination, message, }) {
        const result = await this.sesService.client
            .sendEmail({ Source: source, Destination: destination, Message: message })
            .promise();
        return result;
    }
    async sendRawEmail({ rawMessage }) {
        const result = await this.sesService.client.sendRawEmail({ RawMessage: rawMessage }).promise();
        return result;
    }
};
SimpleEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ses_service_1.SESService])
], SimpleEmailService);
exports.SimpleEmailService = SimpleEmailService;
//# sourceMappingURL=simple-email.service.js.map