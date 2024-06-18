import { Repository } from 'typeorm';
import { AdminTypeormEntity } from '../entities/admins.typeorm-entity';
export declare class AdminsTypeormRepository extends Repository<AdminTypeormEntity> {
    findByCredentialsOrFail(login: string, password: string): Promise<AdminTypeormEntity>;
}
