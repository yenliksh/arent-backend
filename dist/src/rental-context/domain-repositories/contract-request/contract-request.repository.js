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
exports.ContractRequestRepository = void 0;
const types_1 = require("../../domains/contract-request/domain/types");
const contract_request_orm_entity_1 = require("../../../infrastructure/database/entities/contract-request.orm-entity");
const contract_orm_entity_1 = require("../../../infrastructure/database/entities/contract.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const enums_1 = require("../../../infrastructure/enums");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const exceptions_1 = require("../../../libs/exceptions");
const common_1 = require("@nestjs/common");
const contract_request_entity_1 = require("../../domains/contract-request/domain/entities/contract-request.entity");
const contract_request_orm_mapper_1 = require("./contract-request.orm-mapper");
let ContractRequestRepository = class ContractRequestRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new contract_request_orm_mapper_1.ContractRequestOrmMapper(contract_request_entity_1.ContractRequestEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await contract_request_orm_entity_1.ContractRequestOrmEntity.query(trx).findOne(where);
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async findMany(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await contract_request_orm_entity_1.ContractRequestOrmEntity.query(trx).where(where);
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
    }
    async findOneById(id, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const contractRequest = await contract_request_orm_entity_1.ContractRequestOrmEntity.query(trx).findById(id);
        if (!contractRequest) {
            return contractRequest;
        }
        return this.mapper.toDomainEntity(contractRequest, trxId);
    }
    async findOneByContractId(contractId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const contractSubQuery = contract_orm_entity_1.ContractOrmEntity.query(trx).findById(contractId);
        const contractRequest = await contract_orm_entity_1.ContractOrmEntity.relatedQuery('contractRequest', trx).for(contractSubQuery).first();
        if (!contractRequest) {
            return contractRequest;
        }
        return this.mapper.toDomainEntity(contractRequest, trxId);
    }
    async findOneForAccepting(id, landlordId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await contract_request_orm_entity_1.ContractRequestOrmEntity.query(trx)
            .joinRelated({ apartmentAd: true })
            .where('apartmentAd.landlordId', landlordId)
            .findOne(`${contract_request_orm_entity_1.ContractRequestOrmEntity.tableName}.id`, id);
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async findOneWithUserId(id, userId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await contract_request_orm_entity_1.ContractRequestOrmEntity.query(trx)
            .joinRelated({ apartmentAd: true })
            .where((builder) => {
            builder.where('apartmentAd.landlordId', userId).orWhere({ tenantId: userId });
        })
            .findOne(`${contract_request_orm_entity_1.ContractRequestOrmEntity.tableName}.id`, id);
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async save(entity, trxId) {
        entity.validate();
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await contract_request_orm_entity_1.ContractRequestOrmEntity.startTransaction();
        try {
            const result = await contract_request_orm_entity_1.ContractRequestOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
                insertMissing: true,
            });
            if (!trxId) {
                await trx.commit();
                await trx.executionPromise;
            }
            return new uuid_value_object_1.UUID(result.id);
        }
        catch (err) {
            if (!trxId) {
                await trx.rollback();
            }
            throw err;
        }
    }
    async delete(entity, trxId) {
        entity.validate();
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await contract_request_orm_entity_1.ContractRequestOrmEntity.startTransaction();
        await contract_request_orm_entity_1.ContractRequestOrmEntity.query(trx).delete().where('id', entity.id.value);
        return entity;
    }
    async checkExist(props, trxId) {
        const { apartmentAdId, apartmentRentPeriodType, tenantId, arrivalDate, departureDate } = props;
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const contractRequestQb = contract_request_orm_entity_1.ContractRequestOrmEntity.query(trx).findOne({
            tenantId,
            apartmentAdId,
            apartmentRentPeriodType,
        });
        const rentPeriodQbMapper = {
            [enums_1.ApartmentRentPeriodType.SHORT_TERM]: () => {
                return contractRequestQb.where({ arrivalDate, departureDate });
            },
            [enums_1.ApartmentRentPeriodType.LONG_TERM]: () => {
                return contractRequestQb
                    .where({ status: types_1.ContractRequestStatus.CREATED })
                    .orWhere((builder) => builder
                    .withGraphFetched({ contract: true })
                    .modifyGraph('contract', (builder) => builder.whereIn('status', [enums_1.ContractStatus.REJECTED, enums_1.ContractStatus.COMPLETED])));
            },
        };
        const found = await rentPeriodQbMapper[apartmentRentPeriodType]();
        return !!found;
    }
    async checkApartmentIsFree({ apartmentAdId, apartmentRentPeriodType, trxId, from, to, }) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const foundContractQb = contract_orm_entity_1.ContractOrmEntity.query(trx)
            .where({ apartmentAdId })
            .whereIn('status', [enums_1.ContractStatus.CONCLUDED, enums_1.ContractStatus.COMPLETED])
            .select('id');
        const rentPeriodQbMapper = {
            [enums_1.ApartmentRentPeriodType.SHORT_TERM]: () => {
                if (!from || !to) {
                    throw new exceptions_1.ArgumentInvalidException('From and to date required');
                }
                return foundContractQb.findOne((builder) => {
                    builder
                        .whereRaw(`(TIMESTAMP '${from}', TIMESTAMP '${to}') OVERLAPS ("arrivalDate", "departureDate")`)
                        .orWhere((builder) => {
                        builder
                            .where({ apartmentRentPeriodType: enums_1.ApartmentRentPeriodType.LONG_TERM })
                            .andWhere('arrivalDate', '<=', to);
                    });
                });
            },
            [enums_1.ApartmentRentPeriodType.LONG_TERM]: () => {
                return foundContractQb
                    .findOne('departureDate', '>', 'NOW()')
                    .where({ apartmentRentPeriodType: enums_1.ApartmentRentPeriodType.LONG_TERM });
            },
        };
        const result = await rentPeriodQbMapper[apartmentRentPeriodType]();
        return !result;
    }
    prepareQuery(params) {
        const where = {};
        if (params.id) {
            where.id = params.id.value;
        }
        if (params.createdAt) {
            where.createdAt = params.createdAt.value;
        }
        if (params.tenantId) {
            where.tenantId = params.tenantId.value;
        }
        if (params.apartmentAdId) {
            where.apartmentAdId = params.apartmentAdId.value;
        }
        if (params.apartmentRentPeriodType) {
            where.apartmentRentPeriodType = params.apartmentRentPeriodType;
        }
        if (params.status) {
            where.status = params.status.value;
        }
        if (params.arrivalDate) {
            where.arrivalDate = params.arrivalDate.value;
        }
        if (params.departureDate) {
            where.departureDate = params.departureDate.value;
        }
        if (params.status) {
            where.status = params.status.value;
        }
        if (params.tenantId) {
            where.tenantId = params.tenantId.value;
        }
        return where;
    }
};
ContractRequestRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], ContractRequestRepository);
exports.ContractRequestRepository = ContractRequestRepository;
//# sourceMappingURL=contract-request.repository.js.map