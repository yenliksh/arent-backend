import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';
import { parseFileKeyFromUrl } from '@libs/utils/file-key.helper';

export interface DocumentsProps {
  fileKeys: string[];
}

export class DocumentsVO extends ValueObject<DocumentsProps> {
  constructor(props: DocumentsProps) {
    const transformedProps = DocumentsVO.transform(props);
    super(transformedProps);
    this.props.fileKeys = DocumentsVO.format(transformedProps.fileKeys);
  }

  get fileKeys(): string[] {
    return this.props.fileKeys;
  }

  protected validate({ fileKeys }: DocumentsProps): void {
    if (fileKeys.some(Guard.isEmpty)) {
      throw new ArgumentInvalidException('File key is empty');
    }

    if (!fileKeys.every((i) => Guard.isFileKey(i) === true)) {
      throw new ArgumentInvalidException('Url has incorrect format');
    }
  }

  static format(fileKeys: string[]): string[] {
    return fileKeys.map((i) => i.trim());
  }

  static transform(props: DocumentsProps): DocumentsProps {
    return { ...props, fileKeys: props.fileKeys.map(parseFileKeyFromUrl) };
  }
}
