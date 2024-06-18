export declare class AdminTypeormEntity {
    static tableName: string;
    id: string;
    updateEmail(): void;
    login: string;
    hashPasswordBeforeInsert(): void;
    hashPasswordBeforeUpdate(): void;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}
