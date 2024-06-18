import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

const tableName = 'apartment_adentificator';

@Entity({
  name: tableName,
})
export class ApartmentAdIdentificatorTypeormEntity {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  apartmentId: string;

  @Column({ type: 'varchar', nullable: true })
  keywordsSeo?: string;
  @Column({ type: 'varchar', nullable: true })
  titleSeo?: string;
  @Column({ type: 'varchar', nullable: true })
  descriptionSeo?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
