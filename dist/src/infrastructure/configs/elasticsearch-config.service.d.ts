import { ClientOptions } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';
export declare class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createElasticsearchOptions(): Promise<ClientOptions>;
}
