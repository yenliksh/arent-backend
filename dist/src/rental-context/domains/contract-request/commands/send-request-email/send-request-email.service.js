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
exports.SendRequestEmailService = void 0;
const booking_request_sent_event_1 = require("../../../../../modules/notifications/services/booking-request-sent/booking-request-sent.event");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const oxide_ts_1 = require("oxide.ts");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
let SendRequestEmailService = class SendRequestEmailService {
    constructor(userRepository, eventEmitter) {
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
    }
    async handle(userId) {
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('User not found'));
        }
        this.eventEmitter.emit(booking_request_sent_event_1.BookingRequestSentEvent.eventName, booking_request_sent_event_1.BookingRequestSentEvent.create({
            recipientId: user.id,
        }));
        return (0, oxide_ts_1.Ok)('Email was sent successfully');
    }
};
SendRequestEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, event_emitter_1.EventEmitter2])
], SendRequestEmailService);
exports.SendRequestEmailService = SendRequestEmailService;
//# sourceMappingURL=send-request-email.service.js.map