import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ApartmentAdTypeormEntity } from '@modules/admin-panel/apartment-ads/entities/apartment-ad.typeorm-entity';
import { ApartmentAdStatusType, CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const tableName = 'short_term_rents';

@Entity({
  name: tableName,
})
export class ShortTermRentTypeormEntity {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', unique: true })
  cost: number;

  @Column({ type: 'enum', enum: CurrencyType, default: CurrencyType.KZT })
  currency: CurrencyType;

  @Column({ type: 'varchar', array: true, default: JSON.stringify([ApartmentAdStatusType.DRAFT]) })
  status: ApartmentAdStatusType[];

  @Column({ type: 'boolean' })
  isApproved: boolean;

  @Column({ type: 'text', nullable: true })
  declineReason?: string;

  @Column({ type: 'uuid' })
  apartmentAdId: string;

  @Column({ type: 'enum', enum: ShortTermRentBookingType, default: CurrencyType.KZT })
  rentBookingType: ShortTermRentBookingType;

  @Column({ type: 'enum', enum: ShortTermRentCancellationPolicyType, nullable: true })
  cancellationPolicy?: ShortTermRentCancellationPolicyType;

  @Column({ type: 'varchar', nullable: true })
  arrivalTime?: string;

  @Column({ type: 'varchar', nullable: true })
  departureTime?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  /**
   * Relations
   */
  @OneToOne(() => ApartmentAdTypeormEntity, (apartmentAdTypeormEntity) => apartmentAdTypeormEntity.shortTermRent, {
    nullable: true,
  })
  @JoinColumn({ name: 'apartmentAdId' })
  apartmentAd?: ApartmentAdTypeormEntity;
}
