import { depositsData } from "./deposits-data";
import { TransactionModel } from "src/app/models/transaction-model";
import { withdrawalsData } from "./withdrawals-data";

export const mixedTransactionsData: TransactionModel[] = [
    depositsData[0],
    withdrawalsData[0],
    depositsData[1],
    withdrawalsData[1]
];
