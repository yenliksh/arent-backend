# CloudFilesStorageModule

**SNSService**
`client` for SNS

**CloudFilesStorageService**

```typescript
async publish(input: { phoneNumber: string; message: string }): Promise<string>
```

### Example

With `useClass` init options

```
CloudFilesStorageModule.forRootAsync({
  useClass: SNSConfigService,
}),
```

</details>

  <details>
    <summary>sns-config.service.ts</summary>

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SNSModuleOptions, SNSOptionsFactory } from '@purrweb/cloud-files-storage';

@Injectable()
export class SNSConfigService implements SNSOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSNSOptions(): SNSModuleOptions {
    return {
      region: this.configService.get<string>('sns.region'),
      accessKeyId: this.configService.get<string>('aws.accessKeyId'),
      secretAccessKey: this.configService.get<string>('aws.secretAccessKey')
    };
  }
}

```

</details>
