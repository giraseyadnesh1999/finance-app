export type TransactionType = 'Credit' | 'Debit';

export type TransactionStatus =
    | 'Pending'
    | 'Completed'
    | 'Failed'
    | 'Refunding'
    | 'Refunded';

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    currency: string;
    type: TransactionType;
    status: TransactionStatus;
}
