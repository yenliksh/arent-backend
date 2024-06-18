import { Result } from 'oxide.ts';
export declare abstract class ElasticsearchDocumentMapperBase<DocumentProps, OrmEntity, DomainEntity> {
    abstract ormEntityToDocument(ormEntity: OrmEntity): Promise<Result<DocumentProps, Error>>;
    abstract domainEntityToDocument(domainEntity: DomainEntity): Promise<Result<DocumentProps, Error>>;
    protected abstract getPropsFromOrmEntity(ormEntity: OrmEntity): Promise<DocumentProps | undefined>;
    protected abstract getPropsFromDomainEntity(domainEntity: DomainEntity): Promise<DocumentProps | undefined>;
}
