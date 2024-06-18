import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ContractStatus } from '@infrastructure/enums';
import { Injectable } from '@nestjs/common';
import { raw } from 'objection';
import { Ok } from 'oxide.ts';
import { ApartmentAdStatusType } from 'src/rental-context/domains/apartment-ad/domain/types';

export type StatusCountResult = { [P in ApartmentAdStatusType]: number };

type AggregatedCounts = {
  count: string;
  type: ApartmentAdStatusType;
};

@Injectable()
export class MyApartmentAdStatusCountService {
  async handle(userId: UserOrmEntity['id']): Promise<Ok<StatusCountResult>> {
    const apartmentAdSubQuery = ApartmentAdOrmEntity.query().where('landlordId', userId);

    const longTermCountsQuery = ApartmentAdOrmEntity.relatedQuery('longTermRent')
      .for(apartmentAdSubQuery)
      .select(raw('count(id), UNNEST(status) as type'))
      .groupBy('type');

    const shortTermCountsQuery = ApartmentAdOrmEntity.relatedQuery('shortTermRent')
      .for(apartmentAdSubQuery)
      .select(raw('count(id), UNNEST(status) as type'))
      .groupBy('type');

    const activeRentContractsCountQuery = ContractOrmEntity.query()
      .where(`${ContractOrmEntity.tableName}.status`, ContractStatus.CONCLUDED)
      .where(`${ContractOrmEntity.tableName}.isTemporary`, false)
      .where('landlordId', userId)
      .count();

    const [longTermCounts, shortTermCounts, activeContractsCount] = await Promise.all([
      longTermCountsQuery,
      shortTermCountsQuery,
      activeRentContractsCountQuery,
    ]);

    const isNotActive = (props: { count: string; type: ApartmentAdStatusType }) =>
      props.type !== ApartmentAdStatusType.ACTIVE;

    const aggregatedCountsWithoutActive = [
      // active status from table does not used by changing business rules
      ...([...longTermCounts, ...shortTermCounts] as unknown as AggregatedCounts[]).filter(isNotActive),
      // now active status calculates by actual contracts with concluded status
      ...activeContractsCount.map((i) => ({ ...i, type: ApartmentAdStatusType.ACTIVE })),
    ] as AggregatedCounts[];

    const result = aggregatedCountsWithoutActive.reduce<{ [P in ApartmentAdStatusType]: number }>(
      (acc, curr) => {
        acc[curr.type] = Number(curr.count) + acc[curr.type];
        return acc;
      },
      {
        [ApartmentAdStatusType.ACTIVE]: 0,
        [ApartmentAdStatusType.DRAFT]: 0,
        [ApartmentAdStatusType.PAUSED]: 0,
        [ApartmentAdStatusType.PROCESSING]: 0,
        [ApartmentAdStatusType.PUBLISHED]: 0,
      },
    );

    return Ok(result);
  }
}
