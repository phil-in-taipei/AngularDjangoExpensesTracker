export interface DepositCreateModel {
    amount: number;
    date: string;
    income_source: number;
    savings_account: number;
 }

export interface TransactionDeletionResponse {
   id: number;
   amount: number;
   savings_account: number;
   message: string;
}

export interface TransactionModel {
    id: number;
    transaction: string;
    amount: number;
    date: string;
    income_source?: number;
    savings_account: number;
}

export interface WithdrawalCreateModel {
    amount: number;
    date: string;
    savings_account: number;
 }
