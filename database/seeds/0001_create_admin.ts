import * as crypto from 'crypto';

import { faker } from '@faker-js/faker';
import { AdminTypeormEntity } from '@modules/admin-panel/admins/entities';
import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<any> {
  const password = process.env.SEED_ADMIN_PASSWORD;
  const recordsCount = await knex(AdminTypeormEntity.tableName).count();

  if (!password || recordsCount[0].count !== '0') {
    return;
  }

  faker.setLocale('ru');

  return knex(AdminTypeormEntity.tableName).insert({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    login: 'admin.arent',
    password: crypto.createHmac('sha256', password).digest('hex'),
  });
}
