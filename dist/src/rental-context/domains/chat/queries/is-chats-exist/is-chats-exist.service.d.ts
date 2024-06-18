import { Ok } from 'oxide.ts';
import { isChatsExistRequest } from './is-chats-exist.request.dto';
export declare class IsChatsExistService {
    handle(userId: string, input: isChatsExistRequest): Promise<Ok<boolean>>;
}
