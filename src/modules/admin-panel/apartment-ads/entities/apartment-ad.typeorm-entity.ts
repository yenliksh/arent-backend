import { ApartmentAdCharacteristicsProps } from '@domain-value-objects/apartment-characteristics.value-object';
import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { LongTermRentTypeormEntity } from '@modules/admin-panel/long-term-rents/entities/long-term-rent.typeorm-entity';
import { ShortTermRentTypeormEntity } from '@modules/admin-panel/short-term-rents/entities/short-term-rent.typeorm-entity';
import { UserTypeormEntity } from '@modules/admin-panel/users/entities/user.typeorm-entity';
import {
  ApartmentCategory,
  ApartmentType,
  LegalCapacityType,
  RentPeriodType,
} from 'src/rental-context/domains/apartment-ad/domain/types';
import { ApartmentAdDescriptionProps } from 'src/rental-context/domains/apartment-ad/domain/value-objects/apartment-ad-description.value-object';
import { MediaProps } from 'src/rental-context/domains/apartment-ad/domain/value-objects/media.value-object';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const tableName = 'apartment_ads';

@Entity({
  name: tableName,
})
export class ApartmentAdTypeormEntity {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  landlordId: string;

  @ManyToOne(() => UserTypeormEntity)
  landlord: UserTypeormEntity;

  @Column({ type: 'enum', enum: RentPeriodType })
  rentPeriodType: RentPeriodType;

  @Column({ type: 'enum', enum: ApartmentType, default: ApartmentType.FLAT })
  apartmentType: ApartmentType;

  @Column({ type: 'enum', enum: ApartmentCategory, default: ApartmentCategory.FLAT })
  apartmentCategory: ApartmentCategory;

  @Column({ type: 'int', unsigned: true, nullable: true })
  numberOfGuests?: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  numberOfRooms?: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;
  @Column({ type: 'varchar', nullable: true })
  city?: string;
  @Column({ type: 'varchar', nullable: true })
  street?: string;
  @Column({ type: 'varchar', nullable: true })
  region?: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  houseNumber?: string;
  @Column({ type: 'float', precision: 14, scale: 10, nullable: true })
  lat?: number;
  @Column({ type: 'float', precision: 14, scale: 10, nullable: true })
  lng?: number;

  @Column({ type: 'json', nullable: true })
  media?: MediaProps;
  @Column({ type: 'json', nullable: true })
  description?: ApartmentAdDescriptionProps;
  @Column({ type: 'json', nullable: true })
  rules?: ApartmentRulesProps;

  @Column({ type: 'json', nullable: true })
  characteristics?: ApartmentAdCharacteristicsProps;

  @Column({ type: 'enum', enum: LegalCapacityType, default: LegalCapacityType.INDIVIDUAL })
  legalCapacityType: LegalCapacityType;

  @Column({ type: 'varchar', length: 50, nullable: true })
  legalCapacityTinBin?: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  legalCapacityCompanyName?: string;
  @Column({ type: 'varchar', length: 200, nullable: true })
  legalCapacityAddress?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  /**
   * Relations
   */
  @OneToOne(() => LongTermRentTypeormEntity, (longTermRentTypeormEntity) => longTermRentTypeormEntity.apartmentAd, {
    nullable: true,
  })
  longTermRent?: LongTermRentTypeormEntity;

  @OneToOne(() => ShortTermRentTypeormEntity, (shortTermRentTypeormEntity) => shortTermRentTypeormEntity.apartmentAd, {
    nullable: true,
  })
  shortTermRent?: ShortTermRentTypeormEntity;
}
