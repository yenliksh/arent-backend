import { AdminTypeormEntity } from './entities';

export type AuthAdmin = {
  admin: AdminTypeormEntity;
  token: string;
};
