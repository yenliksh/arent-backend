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

const tableName = 'long_term_rents';

@Entity({
  name: tableName,
})
export class LongTermRentTypeormEntity {
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

  @Column({ type: 'varchar', array: true, nullable: true })
  ownershipDocuments?: string[];

  @Column({ type: 'uuid' })
  apartmentAdId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  /**
   * Relations
   */
  @OneToOne(() => ApartmentAdTypeormEntity, (apartmentAdTypeormEntity) => apartmentAdTypeormEntity.longTermRent, {
    nullable: true,
  })
  @JoinColumn({ name: 'apartmentAdId' })
  apartmentAd?: ApartmentAdTypeormEntity;
}
