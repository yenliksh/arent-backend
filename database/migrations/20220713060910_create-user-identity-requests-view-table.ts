import type { Knex } from 'knex';

const tableName = 'user_identity_requests';

export async function up(knex: Knex) {
  const create_view_table_raw = `CREATE VIEW "${tableName}" AS SELECT "users"."id" AS "id", "users"."phone" AS "phone", "users"."email" AS "email", "users"."firstName" AS "firstName", "users"."isEmailVerified" AS "isEmailVerified", "users"."lastName" AS "lastName", "users"."middleName" AS "middleName", "users"."birthDate" AS "birthDate", "users"."avatarKey" AS "avatarKey", "users"."gender" AS "gender", "users"."guarantors" AS "guarantors", "users"."emailNotification" AS "emailNotification", "users"."smsNotification" AS "smsNotification", "users"."pushNotification" AS "pushNotification", "users"."identityStatus" AS "identityStatus", "users"."identityDocuments" AS "identityDocuments", "users"."numberFines" AS "numberFines", "users"."identityRejectReason" AS "identityRejectReason", "users"."identityUpdatedAt" AS "identityUpdatedAt", "users"."isPhoneApproved" AS "isPhoneApproved", "users"."createdAt" AS "createdAt", "users"."updatedAt" AS "updatedAt", "users"."deletedAt" AS "deletedAt" FROM "users" "users" WHERE ( "users"."identityStatus" = 'PROCESSING' AND "users"."identityDocuments" IS NOT NULL ) AND ( "users"."deletedAt" IS NULL ) ORDER BY "users"."identityUpdatedAt" DESC`;
  const insert_typeorm_metadata_raw = `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`;
  const insert_typeorm_metadata_parameters = [
    'public',
    'VIEW',
    tableName,
    'SELECT "users"."id" AS "id", "users"."phone" AS "phone", "users"."email" AS "email", "users"."firstName" AS "firstName", "users"."isEmailVerified" AS "isEmailVerified", "users"."lastName" AS "lastName", "users"."middleName" AS "middleName", "users"."birthDate" AS "birthDate", "users"."avatarKey" AS "avatarKey", "users"."gender" AS "gender", "users"."guarantors" AS "guarantors", "users"."emailNotification" AS "emailNotification", "users"."smsNotification" AS "smsNotification", "users"."pushNotification" AS "pushNotification", "users"."identityStatus" AS "identityStatus", "users"."identityDocuments" AS "identityDocuments", "users"."numberFines" AS "numberFines", "users"."identityRejectReason" AS "identityRejectReason", "users"."identityUpdatedAt" AS "identityUpdatedAt", "users"."isPhoneApproved" AS "isPhoneApproved", "users"."createdAt" AS "createdAt", "users"."updatedAt" AS "updatedAt", "users"."deletedAt" AS "deletedAt" FROM "users" "users" WHERE ( "users"."identityStatus" = \'PROCESSING\' AND "users"."identityDocuments" IS NOT NULL ) AND ( "users"."deletedAt" IS NULL ) ORDER BY "users"."identityUpdatedAt" DESC"',
  ];

  return Promise.all([
    knex.raw(create_view_table_raw),
    knex.raw(insert_typeorm_metadata_raw, insert_typeorm_metadata_parameters),
  ]);
}

export async function down(knex: Knex) {
  const drop_view_table_raw = `DROP VIEW "${tableName}"`;
  const remove_typeorm_metadata_raw = `DELETE FROM "typeorm_metadata" WHERE "type" = ? AND "name" = ? AND "schema" = ?`;
  const remove_typeorm_metadata_parameters = ['VIEW', tableName, 'public'];

  return Promise.all([
    knex.raw(remove_typeorm_metadata_raw, remove_typeorm_metadata_parameters),
    knex.raw(drop_view_table_raw),
  ]);
}
