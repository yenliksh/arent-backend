import { UserEntity, UserProps } from '@domains/user/domain/entities/user.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';

export interface UserRepositoryPort extends RepositoryPort<UserEntity, UserProps> {
  findOneByEmail(email: string): Promise<UserEntity | undefined>;
  findOneByPhone(phone: string): Promise<UserEntity | undefined>;
  existsByEmail(email: string): Promise<boolean>;
  existsByPhone(phone: string): Promise<boolean>;
  findByApartmentAdId(apartmentAdId: string, trxId?: TransactionId): Promise<UserEntity | undefined>;
}
