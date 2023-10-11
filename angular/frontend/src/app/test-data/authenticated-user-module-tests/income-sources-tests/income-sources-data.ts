import { 
    IncomeSourceCreateModel, IncomeSourceDeletionResponse, 
    IncomeSourceModel } from "src/app/models/income-source.model";

export const createdSavingsAccount: IncomeSourceModel = {
        id: 3, income_source_name: "Test Income Source 3", 
};

export const newIncomeSourceData: IncomeSourceCreateModel = {
    income_source_name: "Income Source 3", 
};

export const incomeSourceDeletionResponse: IncomeSourceDeletionResponse = {
    id: 2,
    message: "Income source successfully deleted!"
}

export const incomeSourcesData: IncomeSourceModel[] = [
    { 
        id: 1, income_source_name: "Test Income Source 1", 
    },
    { 
        id: 2, income_source_name: "Test Income Source 2", 
    }
];

export const incomeSourcesPostDeletionData: IncomeSourceModel[] = [
    incomeSourcesData[0]
];