import { AdComplaintType } from '@domains/apartment-ad-complaint/domain/types';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

const tableName = 'apartment_ad_complaints';

@Entity({
  name: tableName,
})
export class ApartmentAdComplaintTypeormEntity {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  apartmentAdId: string;

  @Column({ type: 'enum', enum: AdComplaintType })
  type: AdComplaintType;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'boolean', default: false })
  isViewed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
