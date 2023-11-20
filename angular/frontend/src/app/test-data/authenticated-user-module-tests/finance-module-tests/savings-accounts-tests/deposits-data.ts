import { banksData } from "../../banks-tests/banks-data";
import { incomeSourcesData } from "../../income-sources-tests/income-sources-data";
import { 
    generateDateOneMonthFromToday,
    generateListOfThreeTestDates 
} from "src/app/shared-utils/date-helpers.util";
import { savingsAccountsData } from "./savings-accounts-data";
import { 
    TransactionModel, DepositCreateModel, TransactionDeletionResponse 
} from "src/app/models/transaction-model";

export const threeDatesThisMonth: [string, string, string] = generateListOfThreeTestDates();
export const dateOneMonthFromToday: string = generateDateOneMonthFromToday();

export const createdDeposit: TransactionModel = {
    id: 3, transaction: "Deposit", 
    amount: '300.00',
    date: threeDatesThisMonth[2],
    income_source: incomeSourcesData[2].id,
    savings_account: savingsAccountsData[2].id,
};

export const newDepositData: DepositCreateModel = {
    amount: 300.00,
    date: threeDatesThisMonth[2],
    income_source: incomeSourcesData[2].id,
    savings_account: savingsAccountsData[2].id,
};

export const depositDeletionResponse: TransactionDeletionResponse = {
    id: 2,
    amount: 100.00,
    savings_account: savingsAccountsData[0].id,
    message: "Spending record successfully deleted!"
}

export const depositsData: TransactionModel[] = [
    { 
        id: 1, transaction: "Deposit", 
        amount: '100.00',
        date: threeDatesThisMonth[0],
        income_source: incomeSourcesData[0].id,
        savings_account: savingsAccountsData[0].id,
    },
    { 
        id: 2, transaction: "Deposit", 
        amount: '200.00',
        date: threeDatesThisMonth[1],
        income_source: incomeSourcesData[1].id,
        savings_account: savingsAccountsData[1].id,
    }
];

export const depsositsPostDeletionData: TransactionModel[] = [
    depositsData[0]
];
