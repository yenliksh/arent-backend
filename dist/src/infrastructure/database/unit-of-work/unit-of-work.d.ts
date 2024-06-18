import { Transaction } from 'objection';
export declare type TransactionId = string;
export declare class UnitOfWork {
    private transactions;
    start(): Promise<TransactionId>;
    execute(id: TransactionId): Promise<void>;
    rollback(id: TransactionId): Promise<void>;
    commit(id: TransactionId): Promise<void>;
    getTrx(id: TransactionId): Transaction;
    private finish;
}
