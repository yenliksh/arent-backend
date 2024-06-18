import { UserComplaintType } from '@domains/user-complaint/domain/types';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

const tableName = 'user_complaints';

@Entity({
  name: tableName,
})
export class UserComplaintTypeormEntity {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  senderUserId: string;

  @Column({ type: 'uuid' })
  recipientUserId: string;

  @Column({ type: 'enum', enum: UserComplaintType })
  type: UserComplaintType[];

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
