/* eslint-disable no-unused-vars */
export enum TransactionType {
    Credit,
    Debit
}

export const TransactionTypeDisplay: Record<TransactionType, string> = {
    [TransactionType.Credit]: "Expense",
    [TransactionType.Debit]: "Income"
};

export default TransactionType;
