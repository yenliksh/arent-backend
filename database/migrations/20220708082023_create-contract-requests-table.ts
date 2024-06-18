import type { Knex } from 'knex';

const tableName = 'contract_requests';

export async function up(knex: Knex) {
  const apartmentRentPeriodType = ['LONG_TERM', 'SHORT_TERM'];
  const statusType = ['CREATED', 'REJECTED', 'ACCEPTED'];
  const rentBookingType = ['REQUEST', 'INSTANT'];
  const rentPaymentType = ['FULL', 'PARTIAL'];

  await knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.uuid('tenantId').index().notNullable().references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    t.uuid('apartmentAdId')
      .index()
      .notNullable()
      .references('id')
      .inTable('apartment_ads')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.uuid('rentPeriodVersionId')
      .notNullable()
      .references('id')
      .inTable('rent_period_versions')
      .onDelete('cascade')
      .onUpdate('cascade');

    t.enum('apartmentRentPeriodType', apartmentRentPeriodType).notNullable();
    t.enum('status', statusType).notNullable();
    t.timestamp('arrivalDate');
    t.timestamp('departureDate');

    t.string('comment');
    t.string('rejectReason');

    t.enum('rentBookingType', rentBookingType);
    t.enum('rentPaymentType', rentPaymentType);

    t.json('guests').notNullable();

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');

    t.check(
      `("apartmentRentPeriodType" = 'SHORT_TERM' AND "arrivalDate" IS NOT NULL AND "departureDate" IS NOT NULL AND "arrivalDate" < "departureDate")
      OR ("apartmentRentPeriodType" = 'LONG_TERM' AND "arrivalDate" IS NULL AND "departureDate" IS NULL)`,
    );
  });

  return knex.schema.raw(
    `ALTER TABLE ${tableName}
    add constraint contract_requests__uniq_active_request
    EXCLUDE USING gist (
      "tenantId" WITH =,
      "apartmentAdId" WITH =,
      tstzrange("arrivalDate", "departureDate") WITH =
    ) WHERE (status = 'CREATED') DEFERRABLE INITIALLY DEFERRED`,
  );
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
