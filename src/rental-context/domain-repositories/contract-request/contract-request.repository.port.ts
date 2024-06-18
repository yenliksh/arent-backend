import {
  ContractRequestEntity,
  ContractRequestProps,
} from '@domains/contract-request/domain/entities/contract-request.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';

export interface ContractRequestRepositoryPort extends RepositoryPort<ContractRequestEntity, ContractRequestProps> {
  findOneByContractId(contractId: string, trxId?: TransactionId): Promise<ContractRequestEntity | undefined>;
  checkApartmentIsFree(props: {
    apartmentAdId: string;
    apartmentRentPeriodType: ApartmentRentPeriodType;
    trxId?: TransactionId;
    from?: string;
    to?: string;
  }): Promise<boolean>;
  findOneWithUserId(id: string, userId: string, trxId?: TransactionId): Promise<ContractRequestEntity | undefined>;
  checkExist(
    props: {
      tenantId: string;
      apartmentAdId: string;
      arrivalDate?: string;
      departureDate?: string;
      apartmentRentPeriodType: ApartmentRentPeriodType;
    },
    trxId?: TransactionId,
  ): Promise<boolean>;
}
