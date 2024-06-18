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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsService = void 0;
const common_1 = require("@nestjs/common");
const sqs_consumer_1 = require("sqs-consumer");
const sqs_producer_1 = require("sqs-producer");
const discovery_1 = require("@nestjs-plus/discovery");
const sqs_constants_1 = require("./sqs.constants");
let SqsService = class SqsService {
    constructor(options, discover) {
        this.options = options;
        this.discover = discover;
        this.consumers = new Map();
        this.producers = new Map();
        this.logger = new common_1.Logger('SqsService', {
            timestamp: false,
        });
    }
    onModuleInit() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const messageHandlers = yield this.discover.providerMethodsWithMetaAtKey(sqs_constants_1.SQS_CONSUMER_METHOD);
            const eventHandlers = yield this.discover.providerMethodsWithMetaAtKey(sqs_constants_1.SQS_CONSUMER_EVENT_HANDLER);
            (_a = this.options.consumers) === null || _a === void 0 ? void 0 : _a.forEach((options) => {
                const { name } = options, consumerOptions = __rest(options, ["name"]);
                if (this.consumers.has(name)) {
                    throw new Error(`Consumer already exists: ${name}`);
                }
                const metadata = messageHandlers.find(({ meta }) => meta.name === name);
                if (!metadata) {
                    this.logger.warn(`No metadata found for: ${name}`);
                }
                const isBatchHandler = metadata.meta.batch === true;
                const consumer = sqs_consumer_1.Consumer.create(Object.assign(Object.assign({}, consumerOptions), (isBatchHandler
                    ? {
                        handleMessageBatch: metadata.discoveredMethod.handler.bind(metadata.discoveredMethod.parentClass.instance),
                    }
                    : { handleMessage: metadata.discoveredMethod.handler.bind(metadata.discoveredMethod.parentClass.instance) })));
                const eventsMetadata = eventHandlers.filter(({ meta }) => meta.name === name);
                for (const eventMetadata of eventsMetadata) {
                    if (eventMetadata) {
                        consumer.addListener(eventMetadata.meta.eventName, eventMetadata.discoveredMethod.handler.bind(metadata.discoveredMethod.parentClass.instance));
                    }
                }
                this.consumers.set(name, consumer);
            });
            (_b = this.options.producers) === null || _b === void 0 ? void 0 : _b.forEach((options) => {
                const { name } = options, producerOptions = __rest(options, ["name"]);
                if (this.producers.has(name)) {
                    throw new Error(`Producer already exists: ${name}`);
                }
                const producer = sqs_producer_1.Producer.create(producerOptions);
                this.producers.set(name, producer);
            });
            for (const consumer of this.consumers.values()) {
                consumer.start();
            }
        });
    }
    onModuleDestroy() {
        for (const consumer of this.consumers.values()) {
            consumer.stop();
        }
    }
    getQueueInfo(name) {
        var _a;
        if (!this.consumers.has(name) && !this.producers.has(name)) {
            throw new Error(`Consumer/Producer does not exist: ${name}`);
        }
        const { sqs, queueUrl } = ((_a = this.consumers.get(name)) !== null && _a !== void 0 ? _a : this.producers.get(name));
        if (!sqs) {
            throw new Error('SQS instance does not exist');
        }
        return {
            sqs,
            queueUrl,
        };
    }
    purgeQueue(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sqs, queueUrl } = this.getQueueInfo(name);
            return sqs
                .purgeQueue({
                QueueUrl: queueUrl,
            })
                .promise();
        });
    }
    getQueueAttributes(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sqs, queueUrl } = this.getQueueInfo(name);
            const response = yield sqs
                .getQueueAttributes({
                QueueUrl: queueUrl,
                AttributeNames: ['All'],
            })
                .promise();
            return response.Attributes;
        });
    }
    getProducerQueueSize(name) {
        if (!this.producers.has(name)) {
            throw new Error(`Producer does not exist: ${name}`);
        }
        return this.producers.get(name).queueSize();
    }
    send(name, payload) {
        if (!this.producers.has(name)) {
            throw new Error(`Producer does not exist: ${name}`);
        }
        const originalMessages = Array.isArray(payload) ? payload : [payload];
        const messages = originalMessages.map((message) => {
            let body = message.body;
            if (typeof body !== 'string') {
                body = JSON.stringify(body);
            }
            return Object.assign(Object.assign({}, message), { body });
        });
        const producer = this.producers.get(name);
        return producer.send(messages);
    }
};
SqsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sqs_constants_1.SQS_OPTIONS)),
    __metadata("design:paramtypes", [Object, discovery_1.DiscoveryService])
], SqsService);
exports.SqsService = SqsService;
