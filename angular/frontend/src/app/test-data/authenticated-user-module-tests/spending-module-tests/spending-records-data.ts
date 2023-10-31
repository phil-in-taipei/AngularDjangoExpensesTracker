import { currenciesData } from "../currencies-tests/currencies-data";
import { expensesData, createdExpense } from "./expenses-data";
import { 
    generateDateOneMonthFromToday,
    generateListOfThreeTestDates 
} from "src/app/shared-utils/date-helpers.util";
import { 
    SpendingRecordCreateModel, 
    SpendingRecordDeletionResponse, 
    SpendingRecordModel 
} from "src/app/models/spending-record.model";


export const threeDatesThisMonth: [string, string, string] = generateListOfThreeTestDates();
export const dateOneMonthFromToday: string = generateDateOneMonthFromToday();

export const createdSpendingRecord: SpendingRecordModel = {
    id: 3, amount: 300.00, 
    currency: currenciesData[1],
    date: threeDatesThisMonth[2],
    expense: createdExpense,
};

export const createdSpendingRecordNextMonth: SpendingRecordModel = {
    id: 4, amount: 400.00, 
    currency: currenciesData[1],
    date: dateOneMonthFromToday,
    expense: createdExpense,
};

export const newSpendingRecordData: SpendingRecordCreateModel = {
    amount: 300.00, 
    currency: currenciesData[1],
    date: threeDatesThisMonth[2],
    expense: createdExpense
};

export const spendingRecordDeletionResponse: SpendingRecordDeletionResponse = {
    id: 2,
    message: "Spending record successfully deleted!"
}

export const spendingRecordsData: SpendingRecordModel[] = [
    { 
        id: 1, amount: 100.00, 
        currency: currenciesData[0],
        date: threeDatesThisMonth[0],
        expense: expensesData[0],
    },
    { 
        id: 2, amount: 200.00, 
        currency: currenciesData[1],
        date: threeDatesThisMonth[1],
        expense: expensesData[1],
    }
];

export const spendingRecordsPostDeletionData: SpendingRecordModel[] = [
    spendingRecordsData[0]
];
