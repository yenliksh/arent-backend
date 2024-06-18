import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ApartmentAdStatusType } from 'src/rental-context/domains/apartment-ad/domain/types';

import { ElasticsearchRepositoryBase } from '../base-classes/elasticsearch.repository.base';
import { LongTermRentDocument, LongTermRentDocumentProps } from '../documents/long-term-rent.document';
import { LongTermRentDocumentMapper } from '../mappers/long-term-rent.document-mapper';
import { LongTermRentDocumentRepositoryPort } from './long-term-rent.document-repository.port';

export class LongTermRentDocumentRepository
  extends ElasticsearchRepositoryBase<LongTermRentDocumentProps, LongTermRentOrmEntity, ApartmentAdEntity>
  implements LongTermRentDocumentRepositoryPort
{
  constructor(client: ElasticsearchService) {
    super(client, new LongTermRentDocumentMapper(), new LongTermRentDocument());
  }

  async save(entity: ApartmentAdEntity, slug?: string): Promise<string> {
    const apartmentAdShortTermRentDocument = await this.mapper.domainEntityToDocument(entity);

    if (apartmentAdShortTermRentDocument.isErr()) {
      const errorMessage = 'The long-term rental period mapper cannot be complete successfully';

      this.logger.error(errorMessage);

      throw new Error(errorMessage);
    }

    const body = apartmentAdShortTermRentDocument.unwrap();

    await this.client.index({
      index: this.document.indexName,
      id: body.id,
      body: {
        ...body,
        slug,
      },
    });

    return 'apartmentAdShortTermRentDocument.unwrap();';
  }

  async update(entity: ApartmentAdEntity) {
    // TODO: refactor implement properly update
    await this.delete(entity);
    await this.save(entity);
  }

  async delete(entity: ApartmentAdEntity) {
    if (!entity.isLongTermRent || !entity.longTermRentId?.value) {
      const errorMessage = 'Apartment ad does not have related long term rent entity';

      this.logger.error(errorMessage);

      throw new Error(errorMessage);
    }

    const apartmentAdShortTermRentDocument = await this.mapper.domainEntityToDocument(entity);
    const body = apartmentAdShortTermRentDocument.unwrap();

    await this.client.delete({
      index: body.id,
      id: entity.id.value,
    });

    return entity.id.value;
  }

  async update2(entity: ApartmentAdEntity, apartmentSeo?: ApartmentAdIdentificatorEntity) {
    if (!entity.isLongTermRent || !entity.longTermRentId?.value) {
      const errorMessage = 'Apartment ad does not have related long term rent entity';

      this.logger.error(errorMessage);

      throw new Error(errorMessage);
    }

    const apartmentAdShortTermRentDocument = await this.mapper.domainEntityToDocument(entity);

    const apartmentSeoProps = apartmentSeo?.getPropsCopy();

    if (apartmentAdShortTermRentDocument.isErr()) {
      const errorMessage = 'The long-term rental period mapper cannot be complete successfully';

      this.logger.error(errorMessage);

      throw new Error(errorMessage);
    }

    const body = apartmentAdShortTermRentDocument.unwrap();

    await this.client.updateByQuery({
      index: [this.document.indexName],
      body: {
        query: {
          match: {
            id: body.id,
          },
          set: {
            field: 'slug',
            value: `${apartmentSeoProps?.adSearchId}-${apartmentSeoProps?.titleSeo}`,
          },
        },
      },
    });

    return entity.id.value;
  }

  async deleteById(longTermRentId: string) {
    await this.client.delete({
      index: this.document.indexName,
      id: longTermRentId,
    });

    return longTermRentId;
  }

  async seedIndex(): Promise<boolean> {
    this.logger.warn(`Run seeding from DB for ${this.document.indexName}`);

    try {
      const ormEntities = await LongTermRentOrmEntity.query()
        .withGraphJoined({
          apartmentAd: true,
        })
        .where('status', '@>', [ApartmentAdStatusType.PUBLISHED]);

      const documents = await Promise.all(ormEntities.map((i) => this.mapper.ormEntityToDocument(i)));

      if (documents.some((i) => i.isErr())) {
        this.logger.error(`Unable to complete successfully seed operation for ${this.document.indexName}`);
        return false;
      }

      const body = documents
        .map((i) => i.unwrap())
        .flatMap((doc) => [{ index: { _index: this.document.indexName, _id: doc.id } }, doc]);

      await this.client.bulk({ body });

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

    return result.body;
  }
}
