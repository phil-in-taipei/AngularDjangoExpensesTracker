export interface IncomeSourceCreateModel {
    income_source_name: string;
}

export interface IncomeSourceDeletionResponse {
    id: number;
    message: string;
  }

export interface IncomeSourceModel {
    id: number;
    income_source_name: string;
}