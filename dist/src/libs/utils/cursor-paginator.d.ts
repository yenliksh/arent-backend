import { PageAfterCursorInfo, PageBeforeCursorInfo } from '@infrastructure/models/page-cursor-info.model';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
export declare type PaginationResult<T> = {
    data: T[];
    pageInfo: PageAfterCursorInfo | PageBeforeCursorInfo;
};
export declare function encodeCursor(payload: any): string;
export declare function decodeCursor<payloadType>(cursor: string): payloadType;
export declare function getDataWithAfterCursor<T extends Record<string, unknown> | ObjectionEntityBase, U>(data: T[], limit: number, mapper: (item: T) => U, filter?: any, cursorFields?: (keyof T)[]): PaginationResult<U>;
export declare function getDataWithBeforeCursor<T extends Record<string, unknown> | ObjectionEntityBase, U>(data: T[], limit: number, mapper: (item: T) => U, filter?: any, cursorFields?: (keyof T)[]): PaginationResult<U>;
