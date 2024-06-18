import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType, ContractStatus } from '@infrastructure/enums';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { ArgumentInvalidException } from '@libs/exceptions';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model, QueryBuilder } from 'objection';

import { ContractEntity, ContractProps } from '../../domains/contract/domain/entities/contract.entity';
import { ContractOrmMapper } from './contract.orm-mapper';
import { ContractRepositoryPort } from './contract.repository.port';

@Injectable()
export class ContractRepository
  extends ObjectionRepositoryBase<ContractEntity, ContractProps, ContractOrmEntity>
  implements ContractRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new ContractOrmMapper(ContractEntity, unitOfWork));
  }

  async findOne(params: QueryParams<ContractProps> = {}, trxId?: TransactionId) {
    const where = this.prepareQuery(params);

    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await ContractOrmEntity.query(trx).findOne(where).withGraphFetched({ contractCancelation: true });

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async findMany(params: QueryParams<ContractProps> = {}): Promise<ContractEntity[]> {
    const where = this.prepareQuery(params);

    const found = await ContractOrmEntity.query().where(where).withGraphFetched({ contractCancelation: true });

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
  }

  async findCompletedPastContracts(): Promise<ContractEntity[]> {
    const found = await ContractOrmEntity.query()
      .where(`${ContractOrmEntity.tableName}.status`, ContractStatus.CONCLUDED)
      .andWhere(`${ContractOrmEntity.tableName}.departureDate`, '<', 'NOW()')
      .innerJoinRelated({ transactions: true })
      // this condition is necessary to avoid getting a lot of data
      .where((builder) => {
        builder
          .where('transactions.status', '!=', PaymentTransactionStatus.CASH_IN_WAITING)
          .andWhere('transactions.status', '!=', PaymentTransactionStatus.CASH_OUT_WAITING);
      })
      .withGraphFetched({ contractCancelation: true });

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
  }

  async findOneByPaymentTransactionId(
    paymentTransactionId: string,
    trxId?: TransactionId,
  ): Promise<ContractEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const paymentTransactionSubQuery = PaymentTransactionOrmEntity.query(trx).findById(paymentTransactionId);
    const contract = await PaymentTransactionOrmEntity.relatedQuery('contract', trx)
      .for(paymentTransactionSubQuery)
      .withGraphFetched({ contractCancelation: true })
      .limit(1)
      .first();

    return contract ? this.mapper.toDomainEntity(contract, trxId) : undefined;
  }

  async findManyByPaymentTransactionIds(
    paymentTransactionIds: string[],
    trxId?: TransactionId,
  ): Promise<ContractEntity[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const paymentTransactionsSubQuery = PaymentTransactionOrmEntity.query(trx).findByIds(paymentTransactionIds);
    const contracts = await PaymentTransactionOrmEntity.relatedQuery('contract', trx)
      .for(paymentTransactionsSubQuery)
      .withGraphFetched({ contractCancelation: true });

    return contracts.length ? Promise.all(contracts.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
  }

  async findOneById(id: string, trxId?: TransactionId): Promise<ContractEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
    const contract = await ContractOrmEntity.query(trx).findById(id).withGraphFetched({ contractCancelation: true });

    if (!contract) {
      return contract;
    }

    return this.mapper.toDomainEntity(contract, trxId);
  }

  async findOneByLandlordAndChatId(
    chatId: string,
    landlordId: string,
    trxId?: TransactionId,
  ): Promise<ContractEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
    const chatSubQuery = ChatOrmEntity.query(trx).findById(chatId);
    const contract = await ChatOrmEntity.relatedQuery('contract', trx)
      .for(chatSubQuery)
      .findOne({ landlordId })
      .withGraphFetched({ contractCancelation: true });

    if (!contract) {
      return contract;
    }

    return this.mapper.toDomainEntity(contract, trxId);
  }

  async findOneByTenantAndChatId(
    chatId: string,
    tenantId: string,
    trxId?: TransactionId,
  ): Promise<ContractEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const chatSubQuery = ChatOrmEntity.query(trx).findById(chatId);
    const contract = await ChatOrmEntity.relatedQuery('contract', trx)
      .for(chatSubQuery)
      .findOne({ tenantId })
      .withGraphFetched({ contractCancelation: true });

    if (!contract) {
      return contract;
    }

    return this.mapper.toDomainEntity(contract, trxId);
  }

  async findOneByMemberAndChatId(
    chatId: string,
    userId: string,
    trxId?: TransactionId,
  ): Promise<ContractEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const chatSubQuery = ChatOrmEntity.query(trx).findById(chatId);
    const contract = await ChatOrmEntity.relatedQuery('contract', trx)
      .for(chatSubQuery)
      .findOne((builder) => {
        builder.where({ tenantId: userId }).orWhere({ landlordId: userId });
      })
      .withGraphFetched({ contractCancelation: true });

    if (!contract) {
      return contract;
    }

    return this.mapper.toDomainEntity(contract, trxId);
  }

  async findManyForReject({
    apartmentAdId,
    apartmentRentPeriodType,
    from,
    to,
    trxId,
  }: {
    apartmentAdId: string;
    apartmentRentPeriodType: ApartmentRentPeriodType;
    from?: string;
    to?: string;
    trxId?: TransactionId;
  }): Promise<ContractEntity[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const contractsQb = ContractOrmEntity.query(trx)
      .where({ apartmentAdId, status: ContractStatus.CREATED })
      .withGraphFetched({ contractCancelation: true });

    if (apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM) {
      if (!from || !to) {
        throw new ArgumentInvalidException('From and to date required');
      }
      this.intersectionDates(contractsQb, from, to);
    }

    const contracts = await contractsQb;

    if (!contracts) {
      return contracts;
    }

    return Promise.all(contracts.map((contract) => this.mapper.toDomainEntity(contract, trxId)));
  }

  async findOneActiveByCardId(tenantInnopayCardId: string): Promise<ContractEntity | undefined> {
    const found = await ContractOrmEntity.query()
      .findOne({ tenantInnopayCardId })
      .whereNotIn('status', [ContractStatus.COMPLETED, ContractStatus.REJECTED])
      .withGraphFetched({ contractCancelation: true });

    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findByCustomerReference(customerReference: string, trxId?: TransactionId): Promise<ContractEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await ContractOrmEntity.query(trx)
      .findOne({ customerReference })
      .withGraphFetched({ contractCancelation: true });

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async save(entity: ContractEntity, trxId?: TransactionId): Promise<UUID> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ContractOrmEntity.startTransaction();

    try {
      const result = await ContractOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
        insertMissing: true,
      });

      if (!trxId) {
        await trx.commit();
        await trx.executionPromise;
      }

      return new UUID(result.id);
    } catch (err) {
      if (!trxId) {
        await trx.rollback();
      }
      throw err;
    }
  }

  async saveMany(entities: ContractEntity[], trxId?: TransactionId): Promise<UUID[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ContractOrmEntity.startTransaction();

    try {
      const ormEntities = await Promise.all(entities.map((i) => this.mapper.toOrmEntity(i)));

      const results = await ContractOrmEntity.query(trx).upsertGraph(ormEntities, {
        insertMissing: true,
      });

      if (!trxId) {
        await trx.commit();
        await trx.executionPromise;
      }

      return results.map((i) => new UUID(i.id));
    } catch (err) {
      if (!trxId) {
        await trx.rollback();
      }
      throw err;
    }
  }

  async delete(entity: ContractEntity, trxId?: TransactionId): Promise<ContractEntity> {
    entity.validate();

    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ContractOrmEntity.startTransaction();

    try {
      await ContractOrmEntity.query(trx).delete().where('id', entity.id.value);

      if (!trxId) {
        await trx.commit();
        await trx.executionPromise;
      }

      return entity;
    } catch (err) {
      if (!trxId) {
        await trx.rollback();
      }
      throw err;
    }
  }

  async checkApartmentIsFree({
    apartmentAdId,
    apartmentRentPeriodType,
    trxId,
    from,
    to,
    selfContractId,
  }: {
    apartmentAdId: string;
    apartmentRentPeriodType: ApartmentRentPeriodType;
    trxId?: TransactionId;
    from: string;
    to: string;
    selfContractId?: string;
  }) {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const foundContractQb = ContractOrmEntity.query(trx)
      .where({ apartmentAdId })
      .andWhereNot({ status: ContractStatus.REJECTED })
      .andWhereNot({ status: ContractStatus.CREATED })
      .select('id');

    if (selfContractId) {
      foundContractQb.andWhereNot({ id: selfContractId });
    }

    const intersectionDatesQbMapper = {
      [ApartmentRentPeriodType.SHORT_TERM]: () => this.intersectionDates(foundContractQb, from, to),
      [ApartmentRentPeriodType.LONG_TERM]: () => foundContractQb.where('departureDate', '>', from),
    };

    intersectionDatesQbMapper[apartmentRentPeriodType]();

    const result = await foundContractQb;

    return !result.length;
  }

  async findManyActiveContracts(apartmentAdId: string) {
    const found = await ContractOrmEntity.query()
      .where('apartmentAdId', apartmentAdId)
      .whereIn('status', [ContractStatus.CONCLUDED, ContractStatus.CREATED, ContractStatus.OFFERING])
      .withGraphFetched({ contractCancelation: true });

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
  }

  async findManyActiveContractsByUserId(userId: string, trxId?: TransactionId): Promise<ContractEntity[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await ContractOrmEntity.query(trx)
      .whereIn('status', [ContractStatus.CONCLUDED, ContractStatus.CREATED, ContractStatus.OFFERING])
      .andWhere((builder) => {
        builder.where('landlordId', userId).orWhere('tenantId', userId);
      })
      .withGraphFetched({ contractCancelation: true });

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
  }

  protected prepareQuery(params: QueryParams<ContractProps>) {
    const where: DeepPartial<Omit<ContractOrmEntity, keyof Model>> = {};

    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    if (params.tenantId) {
      where.tenantId = params.tenantId.value;
    }
    if (params.landlordId) {
      where.landlordId = params.landlordId.value;
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
    if (params.details?.arrivalDate) {
      where.arrivalDate = params.details.arrivalDate.value;
    }
    if (params.details?.departureDate) {
      where.departureDate = params.details.departureDate.value;
    }
    if (params.shortTermRentBookingType) {
      where.rentBookingType = params.shortTermRentBookingType.value;
    }

    return where;
  }

  private intersectionDates(qb: QueryBuilder<ContractOrmEntity>, from: string, to: string) {
    qb.andWhere((builder) => {
      builder
        .whereRaw(`(TIMESTAMP '${from}', TIMESTAMP '${to}') OVERLAPS ("arrivalDate", "departureDate")`)
        .orWhere((builder) => {
          builder
            .where({ apartmentRentPeriodType: ApartmentRentPeriodType.LONG_TERM })
            .andWhere('arrivalDate', '<=', to);
        });
    });
  }
}
