# CloudFilesStorageModule

**SESService**
`client` for SES

**CloudFilesStorageService**

```typescript
async sendEmail(input: { Source: source, Destination: destination, Message: message }): Promise<string>
```
{ Source: source, Destination: destination, Message: message }
### Example

With `useClass` init options

```
CloudFilesStorageModule.forRootAsync({
  useClass: SESConfigService,
}),
```

</details>

  <details>
    <summary>ses-config.service.ts</summary>

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESModuleOptions, SESOptionsFactory } from '@purrweb/cloud-files-storage';

@Injectable()
export class SESConfigService implements SESOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSNSOptions(): SESModuleOptions {
    return {
      region: this.configService.get<string>('ses.region'),
      accessKeyId: this.configService.get<string>('aws.accessKeyId'),
      secretAccessKey: this.configService.get<string>('aws.secretAccessKey')
    };
  }
}

```

</details>
