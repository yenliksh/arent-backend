import { ContractRequestStatus } from '@domains/contract-request/domain/types';
import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType, ContractStatus } from '@infrastructure/enums';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { ArgumentInvalidException } from '@libs/exceptions';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model, QueryBuilder } from 'objection';

import {
  ContractRequestEntity,
  ContractRequestProps,
} from '../../domains/contract-request/domain/entities/contract-request.entity';
import { ContractRequestOrmMapper } from './contract-request.orm-mapper';
import { ContractRequestRepositoryPort } from './contract-request.repository.port';

@Injectable()
export class ContractRequestRepository
  extends ObjectionRepositoryBase<ContractRequestEntity, ContractRequestProps, ContractRequestOrmEntity>
  implements ContractRequestRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new ContractRequestOrmMapper(ContractRequestEntity, unitOfWork));
  }

  async findOne(params: QueryParams<ContractRequestProps> = {}, trxId?: TransactionId) {
    const where = this.prepareQuery(params);
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await ContractRequestOrmEntity.query(trx).findOne(where);

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async findMany(
    params: QueryParams<ContractRequestProps> = {},
    trxId?: TransactionId,
  ): Promise<ContractRequestEntity[]> {
    const where = this.prepareQuery(params);
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await ContractRequestOrmEntity.query(trx).where(where);

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
  }

  async findOneById(id: string, trxId?: TransactionId): Promise<ContractRequestEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
    const contractRequest = await ContractRequestOrmEntity.query(trx).findById(id);

    if (!contractRequest) {
      return contractRequest;
    }

    return this.mapper.toDomainEntity(contractRequest, trxId);
  }

  async findOneByContractId(contractId: string, trxId?: TransactionId): Promise<ContractRequestEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const contractSubQuery = ContractOrmEntity.query(trx).findById(contractId);
    const contractRequest = await ContractOrmEntity.relatedQuery('contractRequest', trx).for(contractSubQuery).first();

    if (!contractRequest) {
      return contractRequest;
    }

    return this.mapper.toDomainEntity(contractRequest, trxId);
  }

  async findOneForAccepting(
    id: string,
    landlordId: string,
    trxId?: TransactionId,
  ): Promise<ContractRequestEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await ContractRequestOrmEntity.query(trx)
      .joinRelated({ apartmentAd: true })
      .where('apartmentAd.landlordId', landlordId)
      .findOne(`${ContractRequestOrmEntity.tableName}.id`, id);

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async findOneWithUserId(
    id: string,
    userId: string,
    trxId?: TransactionId,
  ): Promise<ContractRequestEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await ContractRequestOrmEntity.query(trx)
      .joinRelated({ apartmentAd: true })
      .where((builder) => {
        builder.where('apartmentAd.landlordId', userId).orWhere({ tenantId: userId });
      })
      .findOne(`${ContractRequestOrmEntity.tableName}.id`, id);

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async save(entity: ContractRequestEntity, trxId?: TransactionId): Promise<UUID> {
    entity.validate();
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ContractRequestOrmEntity.startTransaction();

    try {
      const result = await ContractRequestOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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

  async delete(entity: ContractRequestEntity, trxId?: TransactionId): Promise<ContractRequestEntity> {
    entity.validate();
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ContractRequestOrmEntity.startTransaction();

    await ContractRequestOrmEntity.query(trx).delete().where('id', entity.id.value);

    return entity;
  }

  async checkExist(
    props: {
      tenantId: string;
      apartmentAdId: string;
      arrivalDate?: string;
      departureDate?: string;
      apartmentRentPeriodType: ApartmentRentPeriodType;
    },
    trxId?: TransactionId,
  ): Promise<boolean> {
    const { apartmentAdId, apartmentRentPeriodType, tenantId, arrivalDate, departureDate } = props;
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const contractRequestQb = ContractRequestOrmEntity.query(trx).findOne({
      tenantId,
      apartmentAdId,
      apartmentRentPeriodType,
    });

    const rentPeriodQbMapper: {
      [P in ApartmentRentPeriodType]: () => QueryBuilder<
        ContractRequestOrmEntity,
        ContractRequestOrmEntity | undefined
      >;
    } = {
      [ApartmentRentPeriodType.SHORT_TERM]: () => {
        return contractRequestQb.where({ arrivalDate, departureDate });
      },
      [ApartmentRentPeriodType.LONG_TERM]: () => {
        return contractRequestQb
          .where({ status: ContractRequestStatus.CREATED })
          .orWhere((builder) =>
            builder
              .withGraphFetched({ contract: true })
              .modifyGraph('contract', (builder) =>
                builder.whereIn('status', [ContractStatus.REJECTED, ContractStatus.COMPLETED]),
              ),
          );
      },
    };

    const found = await rentPeriodQbMapper[apartmentRentPeriodType]();

    return !!found;
  }

  async checkApartmentIsFree({
    apartmentAdId,
    apartmentRentPeriodType,
    trxId,
    from,
    to,
  }: {
    apartmentAdId: string;
    apartmentRentPeriodType: ApartmentRentPeriodType;
    trxId?: TransactionId;
    from?: string;
    to?: string;
  }): Promise<boolean> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const foundContractQb = ContractOrmEntity.query(trx)
      .where({ apartmentAdId })
      .whereIn('status', [ContractStatus.CONCLUDED, ContractStatus.COMPLETED])
      .select('id');

    const rentPeriodQbMapper: {
      [P in ApartmentRentPeriodType]: () => QueryBuilder<ContractOrmEntity, ContractOrmEntity | undefined>;
    } = {
      [ApartmentRentPeriodType.SHORT_TERM]: () => {
        if (!from || !to) {
          throw new ArgumentInvalidException('From and to date required');
        }

        return foundContractQb.findOne((builder) => {
          builder
            .whereRaw(`(TIMESTAMP '${from}', TIMESTAMP '${to}') OVERLAPS ("arrivalDate", "departureDate")`)
            .orWhere((builder) => {
              builder
                .where({ apartmentRentPeriodType: ApartmentRentPeriodType.LONG_TERM })
                .andWhere('arrivalDate', '<=', to);
            });
        });
      },
      [ApartmentRentPeriodType.LONG_TERM]: () => {
        return foundContractQb
          .findOne('departureDate', '>', 'NOW()')
          .where({ apartmentRentPeriodType: ApartmentRentPeriodType.LONG_TERM });
      },
    };
    const result = await rentPeriodQbMapper[apartmentRentPeriodType]();

    return !result;
  }

  protected prepareQuery(params: QueryParams<ContractRequestProps>) {
    const where: DeepPartial<Omit<ContractRequestOrmEntity, keyof Model>> = {};

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
}
