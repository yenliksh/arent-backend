import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ISystemMessageData, SystemMessageType } from '../types';
export interface SystemMessageProps {
    type: SystemMessageType;
    contractData: ISystemMessageData;
}
export declare class SystemMessageVO extends ValueObject<SystemMessageProps> {
    static create({ type, contractData }: SystemMessageProps): SystemMessageVO;
    get type(): SystemMessageType;
    get contractData(): ISystemMessageData;
    protected validate({ type }: SystemMessageProps): void;
}
