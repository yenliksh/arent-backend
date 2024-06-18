import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ContractStatus } from '@infrastructure/enums';
import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';

@Injectable()
export class LandlordActiveRentContractsService {
  async handle(userId: UserOrmEntity['id']): Promise<Ok<ContractOrmEntity[]>> {
    const activeRentContracts = await this.findActiveRentContracts(userId);

    return Ok(activeRentContracts);
  }

  private findActiveRentContracts(userId: string) {
    const activeRentContracts = ContractOrmEntity.query()
      .where(`${ContractOrmEntity.tableName}.status`, ContractStatus.CONCLUDED)
      .where(`${ContractOrmEntity.tableName}.isTemporary`, false)
      .where('landlordId', userId);

    return activeRentContracts;
  }
}
