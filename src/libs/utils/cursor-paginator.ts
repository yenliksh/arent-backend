import { PageAfterCursorInfo, PageBeforeCursorInfo } from '@infrastructure/models/page-cursor-info.model';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';

export type PaginationResult<T> = {
  data: T[];
  pageInfo: PageAfterCursorInfo | PageBeforeCursorInfo;
};

export function encodeCursor(payload: any): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function decodeCursor<payloadType>(cursor: string): payloadType {
  return JSON.parse(Buffer.from(cursor, 'base64').toString()) as payloadType;
}

export function getDataWithAfterCursor<T extends Record<string, unknown> | ObjectionEntityBase, U>(
  data: T[],
  limit: number,
  mapper: (item: T) => U,
  filter?: any,
  cursorFields?: (keyof T)[],
): PaginationResult<U> {
  const toReturn = (data: T[], nextAfterCursor: string | null): PaginationResult<U> => ({
    data: data.map(mapper),
    pageInfo: {
      perPage: limit,
      count: data.length,
      afterCursor: nextAfterCursor,
    },
  });

  let nextAfterCursor = null;

  const hasMore = data.length > limit;

  if (hasMore) {
    data.splice(data.length - 1, 1);
  }

  if (data.length === 0) {
    return toReturn(data, nextAfterCursor);
  } else {
    if (hasMore) {
      if (cursorFields) {
        const cursorPayload: any = {};
        for (const field of cursorFields) {
          cursorPayload[field] = (data[data.length - 1] as any)[field];
        }
        nextAfterCursor = encodeCursor({ ...cursorPayload, filter });
      } else {
        nextAfterCursor = encodeCursor({ ...data[data.length - 1], filter });
      }
    }
  }

  return toReturn(data, nextAfterCursor);
}

export function getDataWithBeforeCursor<T extends Record<string, unknown> | ObjectionEntityBase, U>(
  data: T[],
  limit: number,
  mapper: (item: T) => U,
  filter?: any,
  cursorFields?: (keyof T)[],
): PaginationResult<U> {
  const toReturn = (data: T[], nextAfterCursor: string | null): PaginationResult<U> => ({
    data: data.map(mapper),
    pageInfo: {
      perPage: limit,
      count: data.length,
      beforeCursor: nextAfterCursor,
    },
  });

  let nextAfterCursor = null;

  const hasMore = data.length > limit;

  if (hasMore) {
    data.splice(data.length - 1, 1);
  }

  if (data.length === 0) {
    return toReturn(data, nextAfterCursor);
  } else {
    if (hasMore) {
      if (cursorFields) {
        const cursorPayload: any = {};
        for (const field of cursorFields) {
          cursorPayload[field] = (data[data.length - 1] as any)[field];
        }
        nextAfterCursor = encodeCursor({ ...cursorPayload, filter });
      } else {
        nextAfterCursor = encodeCursor({ ...data[data.length - 1], filter });
      }
    }
  }

  return toReturn(data, nextAfterCursor);
}
