import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';
import { parseFileKeyFromUrl } from '@libs/utils/file-key.helper';

export interface MediaMessageProps {
  fileKey: string;
  fileName: string;
  fileWeight: number;
}

export class MediaMessageVO extends ValueObject<MediaMessageProps> {
  constructor(props: MediaMessageProps) {
    const transformedProps = MediaMessageVO.transform(props);
    super(transformedProps);
    this.props.fileKey = MediaMessageVO.format(transformedProps.fileKey);
  }

  static create(props: MediaMessageProps) {
    return new MediaMessageVO(props);
  }

  get fileKey() {
    return this.props.fileKey;
  }

  get fileName() {
    return this.props.fileName;
  }

  get fileWeight() {
    return this.props.fileWeight;
  }

  protected validate({ fileKey, fileName, fileWeight }: MediaMessageProps): void {
    if (!Guard.isFileKey(fileKey)) {
      throw new ArgumentInvalidException('Message media file key must be in fileKey format');
    }
    if (!Guard.isPositiveNumber(fileWeight)) {
      throw new ArgumentInvalidException('File weight must be positive number');
    }
    if (Guard.isEmpty(fileName)) {
      throw new ArgumentInvalidException('File name must be not empty');
    }
  }

  static format(fileKey: string): string {
    return fileKey.trim();
  }

  static transform(props: MediaMessageProps): MediaMessageProps {
    return { ...props, fileKey: parseFileKeyFromUrl(props.fileKey) };
  }
}
