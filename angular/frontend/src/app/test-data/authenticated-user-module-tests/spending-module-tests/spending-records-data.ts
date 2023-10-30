import { currenciesData } from "../currencies-tests/currencies-data";
import { expensesData } from "./expenses-data";
import { 
    generateListOfThreeTestDates 
} from "src/app/shared-utils/date-helpers.util";
import { 
    SpendingRecordCreateModel, 
    SpendingRecordDeletionResponse, 
    SpendingRecordModel 
} from "src/app/models/spending-record.model";


const threeDatesThisMonth: string[] = generateListOfThreeTestDates();

export const createdSpendingRecord: SpendingRecordModel = {
    id: 3, amount: 300.00, 
    currency: currenciesData[1],
    date: threeDatesThisMonth[2],
    expense: expensesData[1],
};

export const newSpendingRecordData: SpendingRecordCreateModel = {
    amount: 300.00, 
    currency: currenciesData[1],
    date: threeDatesThisMonth[2],
    expense: expensesData[1]
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
