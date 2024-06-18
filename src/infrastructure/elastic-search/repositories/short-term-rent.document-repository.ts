import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ApartmentAdStatusType } from 'src/rental-context/domains/apartment-ad/domain/types';

import { ElasticsearchRepositoryBase } from '../base-classes/elasticsearch.repository.base';
import {
  ShortTermRentLockedDateDocument,
  ShortTermRentsLockedDateDocumentProps,
} from '../documents/short-term-rent-locked-dates.document';
import { ShortTermRentRentedDateDocument } from '../documents/short-term-rent-rented-dates.document';
import { ShortTermRentDocument, ShortTermRentDocumentProps } from '../documents/short-term-rent.document';
import { LockedDates } from '../documents/types';
import { ShortTermRentDocumentMapper } from '../mappers/short-term-rent.document-mapper';
import { ShortTermRentDocumentRepositoryPort } from './short-term-rent.document-repository.port';

export class ShortTermRentDocumentRepository
  extends ElasticsearchRepositoryBase<ShortTermRentDocumentProps, ShortTermRentOrmEntity, ApartmentAdEntity>
  implements ShortTermRentDocumentRepositoryPort
{
  private lockedDateDocument: ShortTermRentLockedDateDocument;
  private rentedDateDocument: ShortTermRentRentedDateDocument;

  constructor(client: ElasticsearchService) {
    super(client, new ShortTermRentDocumentMapper(), new ShortTermRentDocument());

    this.lockedDateDocument = new ShortTermRentLockedDateDocument();
    this.rentedDateDocument = new ShortTermRentRentedDateDocument();
  }

  async save(entity: ApartmentAdEntity, slug?: string): Promise<string> {
    const shortTermRentDocumentResp = await this.mapper.domainEntityToDocument(entity);

    if (shortTermRentDocumentResp.isErr()) {
      const errorMessage = 'The short-term rental period mapper cannot be complete successfully';

      this.logger.error(errorMessage);

      throw new Error(errorMessage);
    }

    const shortTermRentDocument = shortTermRentDocumentResp.unwrap();

    const { lockedDates, rentedDates, ...doc } = shortTermRentDocument;

    const body: Omit<ShortTermRentDocumentProps, 'lockedDates' | 'rentedDates'> = doc;
    const shortTermRentBody = [
      {
        index: {
          _index: this.document.indexName,
          _id: doc.id,
        },
      },
      {
        ...body,
        slug,
      },
    ];

    const lockedDatesBody = this.getLockedDatesBody(
      this.lockedDateDocument.indexName,
      lockedDates,
      shortTermRentDocument,
    );

    const rentedDatesBody = this.getLockedDatesBody(
      this.rentedDateDocument.indexName,
      rentedDates,
      shortTermRentDocument,
    );

    await this.client.bulk({ body: [...shortTermRentBody, ...lockedDatesBody, ...rentedDatesBody] });

    return entity.id.value;
  }

  private getLockedDatesBody(
    indexName: string,
    lockedDates: LockedDates[] | null,
    shortTermRentDocument: ShortTermRentDocumentProps,
  ) {
    let shortTermRentLockedDatesBody;
    if (lockedDates) {
      shortTermRentLockedDatesBody = lockedDates.flatMap((lockedDate) => {
        const body: ShortTermRentsLockedDateDocumentProps = {
          id: shortTermRentDocument.id,
          startDate: lockedDate.startDate || null,
          endDate: lockedDate.endDate || null,
          geoPoint: shortTermRentDocument.geoPoint,
        };

        return [{ index: { _index: indexName } }, body];
      });
    } else {
      const body: ShortTermRentsLockedDateDocumentProps = {
        id: shortTermRentDocument.id,
        startDate: null,
        endDate: null,
        geoPoint: shortTermRentDocument.geoPoint,
      };

      shortTermRentLockedDatesBody = [{ index: { _index: indexName } }, body];
    }

    return shortTermRentLockedDatesBody;
  }

  async update(entity: ApartmentAdEntity) {
    // TODO: refactor implement properly update
    await this.delete(entity);
    await this.save(entity);
  }

  async delete(entity: ApartmentAdEntity) {
    if (!entity.isShortTermRent || !entity.shortTermRentId?.value) {
      const errorMessage = 'Apartment ad does not have related Short term rent entity';

      this.logger.error(errorMessage);

      throw new Error(errorMessage);
    }

    const apartmentAdShortTermRentDocument = await this.mapper.domainEntityToDocument(entity);
    const body = apartmentAdShortTermRentDocument.unwrap();

    await this.client.deleteByQuery({
      index: [this.document.indexName, this.lockedDateDocument.indexName, this.rentedDateDocument.indexName],
      body: {
        query: {
          match: {
            id: body.id,
          },
        },
      },
    });

    return entity.id.value;
  }

  async deleteById(shortTermRentId: string) {
    await this.client.deleteByQuery({
      index: [this.document.indexName, this.lockedDateDocument.indexName, this.rentedDateDocument.indexName],
      body: {
        query: {
          match: {
            id: shortTermRentId,
          },
        },
      },
    });

    return shortTermRentId;
  }

  async seedIndex(): Promise<boolean> {
    this.logger.warn(`Run seeding from DB for ${this.document.indexName}`);

    try {
      const ormEntities = await ShortTermRentOrmEntity.query()
        .withGraphJoined({
          apartmentAd: true,
        })
        .where('status', '@>', [ApartmentAdStatusType.PUBLISHED]);

      const documents = await Promise.all(ormEntities.map((i) => this.mapper.ormEntityToDocument(i)));

      if (documents.some((i) => i.isErr())) {
        this.logger.error(`Unable to complete successfully seed operation for ${this.document.indexName}`);
        return false;
      }

      const bulkBody = documents
        .map((i) => i.unwrap())
        .flatMap((shortTermRentDocument) => {
          const { lockedDates, rentedDates, ...doc } = shortTermRentDocument;

          const body: Omit<ShortTermRentDocumentProps, 'lockedDates' | 'rentedDates'> = doc;

          const shortTermRentBody = [
            {
              index: {
                _index: this.document.indexName,
                _id: doc.id,
              },
            },
            body,
          ];

          const lockedDatesBody = this.getLockedDatesBody(
            this.lockedDateDocument.indexName,
            lockedDates,
            shortTermRentDocument,
          );

          const rentedDatesBody = this.getLockedDatesBody(
            this.rentedDateDocument.indexName,
            rentedDates,
            shortTermRentDocument,
          );

          return [...shortTermRentBody, ...lockedDatesBody, ...rentedDatesBody];
        });

      await this.client.bulk({ body: bulkBody });

      return true;
    } catch (error) {
      this.logger.error(`Unable to complete successfully seed operation for ${this.document.indexName}`);
      return false;
    }
  }

  async createIndex(): Promise<boolean> {
    this.logger.warn(`Run index create for ${this.document.indexName}`);

    try {
      await this.client.indices.create(this.document.getIndicesOptions());
      await this.client.indices.create(this.lockedDateDocument.getIndicesOptions());
      await this.client.indices.create(this.rentedDateDocument.getIndicesOptions());

      return true;
    } catch (error) {
      this.logger.error(`Unable to create index successfully for ${this.document.indexName}`);
      return false;
    }
  }

  async isExistIndex(): Promise<boolean> {
    const result = await this.client.indices.exists({
      index: this.document.indexName,
    });

    const lockedDateResult = await this.client.indices.exists({
      index: this.lockedDateDocument.indexName,
    });

    return result.body && lockedDateResult.body;
  }
}
