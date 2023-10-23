import { CurrencyModel } from "./currency.model";
import { ExpenseModel } from "./expense.model";

export interface SpendingRecordCreateModel {
    amount: number;
    currency: CurrencyModel;
    date: string;
    expense: ExpenseModel;
 }

export interface SpendingRecordDeletionResponse {
   id: number;
   message: string;
}

 export interface SpendingRecordModel {
    id: number;
    amount: number;
    currency: CurrencyModel;
    date: string;
    expense: ExpenseModel;
 }
 