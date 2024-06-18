import { UserComplaintEntity, UserComplaintProps } from '@domains/user-complaint/domain/entities/user-complaint.entity';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
export declare type UserComplaintRepositoryPort = RepositoryPort<UserComplaintEntity, UserComplaintProps>;
