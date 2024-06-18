import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException, ArgumentNotProvidedException } from '@libs/exceptions';
import { parseFileKeyFromUrl } from '@libs/utils/file-key.helper';

export interface IMedia {
  order: number;
  fileKey: string;
}

type IPhoto = IMedia;

type IVideo = IMedia;

interface MediaCreateProps {
  photos: string[];
  video?: string[];
}

export interface MediaProps {
  photos: IPhoto[];
  videos: IVideo[];
}

export class MediaVO extends ValueObject<MediaProps> {
  static create(props: MediaCreateProps) {
    const photos: MediaProps['photos'] = props.photos
      .filter(parseFileKeyFromUrl)
      .map((fk, i) => ({ order: i, fileKey: parseFileKeyFromUrl(fk) as string }));

    const videos: MediaProps['videos'] = (props.video || [])
      .filter(parseFileKeyFromUrl)
      .map((fk, i) => ({ order: i, fileKey: fk }));

    return new MediaVO({
      photos,
      videos,
    });
  }

  protected validate(props: MediaProps): void {
    const { photos, videos } = props;

    if (Guard.isEmpty(photos)) {
      throw new ArgumentNotProvidedException('Photos not provided');
    }

    if (!Array.isArray(photos)) {
      throw new ArgumentInvalidException('Photos must be an array');
    }

    if (!Array.isArray(videos)) {
      throw new ArgumentInvalidException('Videos must be an array');
    }
  }
}
