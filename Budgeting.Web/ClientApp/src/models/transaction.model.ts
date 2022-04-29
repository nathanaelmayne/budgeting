import TransactionType from '../enums/transaction-type.enum';

export interface Transaction {
    id: string;
    name: string;
    amount: number;
    timestamp: string;
    type: TransactionType;
}
