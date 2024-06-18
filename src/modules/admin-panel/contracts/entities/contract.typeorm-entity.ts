import { IGuests } from '@domain-value-objects/apartment-guests.value-object';
import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { CurrencyType } from '@domains/apartment-ad/domain/types';
import { IBaseApartmentAdData } from '@domains/contract/domain/value-objects/base-contract-apartment-ad-data.value-object';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import {
  ApartmentRentPeriodType,
  ContractStatus,
  LongTermRentCancellationPolicyType,
  ShortTermRentCancellationPolicyType,
} from '@infrastructure/enums';
import { Model } from 'objection';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

const tableName = 'contracts';

type IContract = Omit<ContractOrmEntity, keyof Model>;

@Entity({ name: tableName })
export class ContractTypeormEntity implements IContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  contractRequestId: string;

  @Column({ type: 'uuid' })
  rentPeriodVersionId: string;

  @Column({ type: 'uuid', nullable: true })
  tenantId?: string;

  @Column({ type: 'uuid', nullable: true })
  landlordId?: string;

  @Column({ type: 'uuid', nullable: true })
  apartmentAdId?: string;

  @Column({ type: 'enum', enum: ApartmentRentPeriodType })
  apartmentRentPeriodType: ApartmentRentPeriodType;

  @Column({ type: 'bigint' })
  cost: number;

  @Column({ type: 'enum', enum: CurrencyType })
  currency: CurrencyType;

  @Column({ type: 'enum', enum: ContractStatus })
  status: ContractStatus;

  @Column({ type: 'timestamp', nullable: true })
  arrivalDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  departureDate?: Date;

  @Column({ type: 'json', nullable: true })
  rules?: ApartmentRulesProps;

  @Column({ type: 'boolean' })
  isPending: boolean;

  @Column({ type: 'boolean' })
  isFined: boolean;

  @Column({ type: 'boolean' })
  isTemporary: boolean;

  @Column({ type: 'enum', enum: ShortTermRentCancellationPolicyType, nullable: true })
  shortTermCancellationPolicy?: ShortTermRentCancellationPolicyType;

  @Column({ type: 'enum', enum: LongTermRentCancellationPolicyType, nullable: true })
  longTermCancellationPolicy?: LongTermRentCancellationPolicyType;

  @Column({ type: 'json' })
  baseApartmentAdData: IBaseApartmentAdData;

  @Column({ type: 'json' })
  guests: IGuests;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
