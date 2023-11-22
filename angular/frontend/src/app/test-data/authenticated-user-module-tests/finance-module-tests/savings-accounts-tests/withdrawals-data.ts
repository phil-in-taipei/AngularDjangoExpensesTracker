import { 
    generateDateOneMonthFromToday,
    generateListOfThreeTestDates 
} from "src/app/shared-utils/date-helpers.util";
import { savingsAccountsData } from "./savings-accounts-data";
import { 
    TransactionModel, TransactionDeletionResponse, WithdrawalCreateModel 
} from "src/app/models/transaction-model";

export const threeDatesThisMonth: [string, string, string] = generateListOfThreeTestDates();
export const dateOneMonthFromToday: string = generateDateOneMonthFromToday();

export const createdWithdrawal: TransactionModel = {
    id: 3, transaction: "Withdrawal", 
    amount: '300.00',
    date: threeDatesThisMonth[2],
    savings_account: savingsAccountsData[1].id,
};

export const newWithdrawalData: WithdrawalCreateModel = {
    amount: 300.00,
    date: threeDatesThisMonth[2],
    savings_account: savingsAccountsData[1].id,
};

export const withdrawalDeletionResponse: TransactionDeletionResponse = {
    id: 2,
    amount: 100.00,
    savings_account: savingsAccountsData[0].id,
    message: "Withdrawal successfully deleted!"
}


export const withdrawalsData: TransactionModel[] = [
    { 
        id: 1, transaction: "Withdrawal", 
        amount: '100.00',
        date: threeDatesThisMonth[0],
        savings_account: 1,
    },
    { 
        id: 2, transaction: "Withdrawal", 
        amount: '200.00',
        date: threeDatesThisMonth[1],
        savings_account: savingsAccountsData[1].id,
    }
];

export const withdrawalsPostDeletionData: TransactionModel[] = [
    withdrawalsData[0]
];
