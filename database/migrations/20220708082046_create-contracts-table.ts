import type { Knex } from 'knex';

const tableName = 'contracts';

export async function up(knex: Knex) {
  const apartmentRentPeriodType = ['LONG_TERM', 'SHORT_TERM'];
  const statusType = ['CREATED', 'REJECTED', 'OFFERING', 'CONCLUDED', 'COMPLETED'];
  const currencyTypes = ['KZT', 'USD', 'RUB'];
  const shortTermCancellationPolicy = ['FLEXIBLE', 'MODERATE', 'INFLEXIBLE', 'STRICT'];
  const longTermCancellationPolicy = ['FORFEIT'];
  const paymentMethod = ['INNOPAY'];
  const rentBookingType = ['REQUEST', 'INSTANT'];
  const rentPaymentType = ['FULL', 'PARTIAL'];

  await knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.uuid('tenantId').index().references('id').inTable('users').onUpdate('cascade').onDelete('set null');
    t.uuid('landlordId').index().references('id').inTable('users').onUpdate('cascade').onDelete('set null');
    t.uuid('apartmentAdId').index().references('id').inTable('apartment_ads').onUpdate('cascade').onDelete('set null');
    t.uuid('contractRequestId')
      .unique()
      .references('id')
      .inTable('contract_requests')
      .onUpdate('cascade')
      .onDelete('set null');
    t.uuid('rentPeriodVersionId')
      .index()
      .notNullable()
      .references('id')
      .inTable('rent_period_versions')
      .onDelete('cascade')
      .onUpdate('cascade');

    t.enum('apartmentRentPeriodType', apartmentRentPeriodType).notNullable();
    t.bigint('cost').unsigned().notNullable();
    t.enum('currency', currencyTypes).defaultTo(currencyTypes[0]).notNullable();
    t.enum('status', statusType).notNullable();
    t.timestamp('arrivalDate');
    t.timestamp('departureDate');
    t.json('rules');

    t.boolean('isPending').notNullable().defaultTo(false);
    t.boolean('isFined').notNullable().defaultTo(false);
    t.boolean('isTemporary').notNullable().defaultTo(false);

    t.enum('defaultPaymentMethod', paymentMethod);
    t.uuid('tenantInnopayCardId').references('id').inTable('innopay_cards').onUpdate('cascade').onDelete('set null');

    t.enum('rentBookingType', rentBookingType);
    t.enum('rentPaymentType', rentPaymentType);

    t.json('baseApartmentAdData').notNullable();
    t.json('guests').notNullable();

    t.enum('shortTermCancellationPolicy', shortTermCancellationPolicy);
    t.enum('longTermCancellationPolicy', longTermCancellationPolicy);

    t.string('customerReference').unique();
    t.string('paymentUrl').unique();
    t.timestamp('paymentUrlStartAt');

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');

    t.check('"arrivalDate" IS NULL OR "departureDate" IS NULL OR "arrivalDate" < "departureDate"');
    t.check(`
      ("apartmentRentPeriodType" = 'SHORT_TERM' AND "rentPaymentType" IS NOT NULL)
      OR ("apartmentRentPeriodType" != 'SHORT_TERM' AND "rentPaymentType" IS NULL)
    `);
    t.check(
      `
      ("defaultPaymentMethod" = 'INNOPAY' AND "tenantInnopayCardId" IS NOT NULL)
      OR ("defaultPaymentMethod" IS NULL AND "tenantInnopayCardId" IS NULL)
      OR ("status" = ANY (ARRAY['COMPLETED'::text, 'REJECTED'::text]) AND ("defaultPaymentMethod" IS NULL OR "defaultPaymentMethod" = 'INNOPAY') AND "tenantInnopayCardId" IS NULL)
    `,
      [],
      'contracts_check2',
    );
  });

  await knex.schema.raw(
    `ALTER TABLE ${tableName}
    add constraint contracts__uniq_active_contract
    EXCLUDE USING gist(
      "apartmentAdId" WITH =,
      tstzrange("arrivalDate", "departureDate") WITH =
    ) WHERE (status = 'OFFERING' OR status = 'CONCLUDED' OR status = 'COMPLETED') DEFERRABLE INITIALLY DEFERRED`,
  );

  return knex.schema.raw(
    `ALTER TABLE ${tableName}
    add constraint contracts__single_tenant_contract
    EXCLUDE USING gist(
      "tenantId" WITH =,
      "apartmentAdId" WITH =,
      tstzrange("arrivalDate", "departureDate") WITH =
    ) WHERE (status <> 'REJECTED' AND "tenantId" IS NOT NULL AND "apartmentAdId" IS NOT NULL) DEFERRABLE INITIALLY DEFERRED`,
  );
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
