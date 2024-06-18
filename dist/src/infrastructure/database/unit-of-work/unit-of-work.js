"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOfWork = void 0;
const common_1 = require("@nestjs/common");
const objection_1 = require("objection");
const uuid_1 = require("uuid");
let UnitOfWork = class UnitOfWork {
    constructor() {
        this.transactions = new Map();
    }
    async start() {
        const id = (0, uuid_1.v4)();
        if (!this.transactions.has(id)) {
            const trx = await objection_1.Model.startTransaction();
            this.transactions.set(id, trx);
        }
        return id;
    }
    async execute(id) {
        const trx = this.transactions.get(id);
        if (!trx) {
            throw new Error('Transaction not found');
        }
        try {
            await trx.commit();
            await trx.executionPromise;
        }
        catch (e) {
            await this.rollback(id);
            throw e;
        }
        finally {
            this.finish(id);
        }
    }
    async rollback(id) {
        const trx = this.transactions.get(id);
        if (trx) {
            await trx.rollback();
            this.finish(id);
        }
    }
    async commit(id) {
        const trx = this.getTrx(id);
        try {
            await trx.commit();
            await trx.executionPromise;
        }
        catch (e) {
            await this.rollback(id);
        }
    }
    getTrx(id) {
        const trx = this.transactions.get(id);
        if (!trx) {
            throw new Error('Transaction not found');
        }
        return trx;
    }
    finish(id) {
        this.transactions.delete(id);
    }
};
UnitOfWork = __decorate([
    (0, common_1.Injectable)()
], UnitOfWork);
exports.UnitOfWork = UnitOfWork;
//# sourceMappingURL=unit-of-work.js.map