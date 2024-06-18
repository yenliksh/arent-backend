import type { Knex } from 'knex';

const tableName = 'apartment_ads';

export async function up(knex: Knex) {
  const rentPeriodTypes = ['LONG_TERM', 'SHORT_TERM', 'ALL'];
  const apartmentTypes = [
    'FLAT',
    'ROOM',
    'COTTAGE',
    'HOSTEL',
    'MINI_HOTEL',
    'GUESTHOUSE',
    'APARTHOTEL',
    'IHC',
    'PC',
    'LGX',
    'LANDFORGARDEN',
    'COMMERCIAL',
    'COUNTRYCONSTRUCTION',
    'OTHER',
    'FREEAPPOINTMENT',
    'OFFICE',
    'STORAGE',
    'PUBLICCATERING',
    'SHOP',
    'BEAUTYSALOON',
    'CARSERVICE',
    'INDUSTRIALBASE',
    'FACTORY',
  ];
  const apartmentCategories = [
    'FLAT',
    'HOUSE',
    'COUNTRYHOUSE',
    'AREA',
    'COMMERCIAL',
    'INDUSTRIAL',
    'FOREIGN',
    'OTHERREALESTATE',
  ];
  const legalCapacityType = ['INDIVIDUAL', 'LEGAL_ENTITY'];
  const paymentMethod = ['INNOPAY'];

  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.enum('rentPeriodType', rentPeriodTypes).notNullable();
    t.enum('apartmentType', apartmentTypes).defaultTo(apartmentTypes[0]);
    t.enum('apartmentCategory', apartmentCategories).defaultTo(apartmentCategories[0]).notNullable();
    t.integer('numberOfGuests').unsigned();
    t.integer('numberOfRooms').unsigned();

    t.smallint('completeStep').unsigned().defaultTo(1);

    t.string('country', 100);
    t.string('city');
    t.string('street');
    t.string('region');
    t.string('houseNumber', 50);
    t.float('lat', 14, 10);
    t.float('lng', 14, 10);
    t.string('timezone');

    t.json('media');
    t.json('description');
    t.json('rules');

    t.json('characteristics');

    t.enum('legalCapacityType', legalCapacityType).defaultTo(legalCapacityType[0]);
    t.string('legalCapacityTinBin', 50);
    t.string('legalCapacityCompanyName', 100);
    t.string('legalCapacityAddress', 200);

    t.uuid('landlordId')
      .index()
      .references('id')
      .inTable('users')
      .onDelete('cascade')
      .onUpdate('cascade')
      .notNullable();

    t.enum('defaultPaymentMethod', paymentMethod);
    t.uuid('innopayCardId').index().references('id').inTable('innopay_cards').onDelete('cascade').onUpdate('cascade');
    t.check(
      '("defaultPaymentMethod" IS NOT NULL AND "innopayCardId" IS NOT NULL) OR ("defaultPaymentMethod" IS NULL AND "innopayCardId" IS NULL)',
    );

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
