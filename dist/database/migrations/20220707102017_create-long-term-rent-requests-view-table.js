"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'long_term_rent_requests';
async function up(knex) {
    const create_view_table_raw = `CREATE VIEW "${tableName}" AS SELECT "apartment_ads"."id" AS "id", "apartment_ads"."landlordId" AS "landlordId", "apartment_ads"."apartmentType" AS "apartmentType", "apartment_ads"."apartmentCategory" AS "apartmentCategory", "apartment_ads"."numberOfGuests" AS "numberOfGuests", "apartment_ads"."numberOfRooms" AS "numberOfRooms", "apartment_ads"."country" AS "country", "apartment_ads"."city" AS "city", "apartment_ads"."street" AS "street", "apartment_ads"."region" AS "region", "apartment_ads"."houseNumber" AS "houseNumber", "apartment_ads"."lat" AS "lat", "apartment_ads"."lng" AS "lng", "apartment_ads"."media" AS "media", "apartment_ads"."description" AS "description", "apartment_ads"."rules" AS "rules", "apartment_ads"."characteristics" AS "characteristics", "apartment_ads"."legalCapacityType" AS "legalCapacityType", "apartment_ads"."legalCapacityTinBin" AS "legalCapacityTinBin", "apartment_ads"."legalCapacityCompanyName" AS "legalCapacityCompanyName", "apartment_ads"."legalCapacityAddress" AS "legalCapacityAddress", "apartment_ads"."createdAt" AS "createdAt", "apartment_ads"."updatedAt" AS "updatedAt", "apartment_ads"."deletedAt" AS "deletedAt", "long_term_rents"."id" AS "longTermRentId", "long_term_rents"."cost" AS "cost", "long_term_rents"."currency" AS "currency", "long_term_rents"."status" AS "status", "long_term_rents"."isApproved" AS "isApproved", "long_term_rents"."declineReason" AS "declineReason", "long_term_rents"."ownershipDocuments" AS "ownershipDocuments", "apartment_ads"."innopayCardId" AS "innopayCardId", "apartment_ads"."defaultPaymentMethod" AS "defaultPaymentMethod", "long_term_rents"."cancellationPolicy" AS "cancellationPolicy" FROM "apartment_ads" "apartment_ads" INNER JOIN "long_term_rents" "long_term_rents" ON  "long_term_rents"."apartmentAdId" = "apartment_ads"."id" AND "long_term_rents"."deletedAt" IS NULL  INNER JOIN "users" "landlords" ON  landlords."id" = "apartment_ads"."landlordId" AND "landlords"."deletedAt" IS NULL WHERE ( 'PROCESSING' = ANY("long_term_rents"."status") AND "apartment_ads"."innopayCardId" IS NOT NULL AND "long_term_rents"."ownershipDocuments" IS NOT NULL AND "landlords"."identityStatus" = 'APPROVED' AND "landlords"."isPhoneApproved" = true ) AND ( "apartment_ads"."deletedAt" IS NULL )`;
    const insert_typeorm_metadata_raw = `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`;
    const insert_typeorm_metadata_parameters = [
        'public',
        'VIEW',
        tableName,
        'SELECT "apartment_ads"."id" AS "id", "apartment_ads"."landlordId" AS "landlordId", "apartment_ads"."apartmentType" AS "apartmentType", "apartment_ads"."apartmentCategory" AS "apartmentCategory", "apartment_ads"."numberOfGuests" AS "numberOfGuests", "apartment_ads"."numberOfRooms" AS "numberOfRooms", "apartment_ads"."country" AS "country", "apartment_ads"."city" AS "city", "apartment_ads"."street" AS "street", "apartment_ads"."region" AS "region", "apartment_ads"."houseNumber" AS "houseNumber", "apartment_ads"."lat" AS "lat", "apartment_ads"."lng" AS "lng", "apartment_ads"."media" AS "media", "apartment_ads"."description" AS "description", "apartment_ads"."rules" AS "rules", "apartment_ads"."characteristics" AS "characteristics", "apartment_ads"."legalCapacityType" AS "legalCapacityType", "apartment_ads"."legalCapacityTinBin" AS "legalCapacityTinBin", "apartment_ads"."legalCapacityCompanyName" AS "legalCapacityCompanyName", "apartment_ads"."legalCapacityAddress" AS "legalCapacityAddress", "apartment_ads"."createdAt" AS "createdAt", "apartment_ads"."updatedAt" AS "updatedAt", "apartment_ads"."deletedAt" AS "deletedAt", "long_term_rents"."id" AS "longTermRentId", "long_term_rents"."cost" AS "cost", "long_term_rents"."currency" AS "currency", "long_term_rents"."status" AS "status", "long_term_rents"."isApproved" AS "isApproved", "long_term_rents"."declineReason" AS "declineReason", "long_term_rents"."ownershipDocuments" AS "ownershipDocuments", "apartment_ads".innopayCardId AS "innopayCardId", "apartment_ads"."defaultPaymentMethod" AS "defaultPaymentMethod", "long_term_rents"."cancellationPolicy" AS "cancellationPolicy" FROM "apartment_ads" "apartment_ads" INNER JOIN "long_term_rents" "long_term_rents" ON  "long_term_rents"."apartmentAdId" = "apartment_ads"."id" AND "long_term_rents"."deletedAt" IS NULL  INNER JOIN "users" "landlords" ON  "landlords"."id" = "apartment_ads"."landlordId" AND "landlords"."deletedAt" IS NULL WHERE ( \'PROCESSING\' = ANY("long_term_rents"."status") AND "apartment_ads"."innopayCardId" IS NOT NULL AND "long_term_rents"."ownershipDocuments" IS NOT NULL AND "landlords"."identityStatus" = \'APPROVED\' AND "landlords"."isPhoneApproved" = true ) AND ( "apartment_ads"."deletedAt" IS NULL )',
    ];
    return Promise.all([
        knex.raw(create_view_table_raw),
        knex.raw(insert_typeorm_metadata_raw, insert_typeorm_metadata_parameters),
    ]);
}
exports.up = up;
async function down(knex) {
    const drop_view_table_raw = `DROP VIEW "${tableName}"`;
    const remove_typeorm_metadata_raw = `DELETE FROM "typeorm_metadata" WHERE "type" = ? AND "name" = ? AND "schema" = ?`;
    const remove_typeorm_metadata_parameters = ['VIEW', tableName, 'public'];
    return Promise.all([
        knex.raw(remove_typeorm_metadata_raw, remove_typeorm_metadata_parameters),
        knex.raw(drop_view_table_raw),
    ]);
}
exports.down = down;
//# sourceMappingURL=20220707102017_create-long-term-rent-requests-view-table.js.map