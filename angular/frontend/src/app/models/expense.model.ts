import { UserModel } from "./user-profile.model";

export interface ExpenseCreateAndUpdateModel {
    expense_name: string;
}

export interface ExpenseDeletionResponse {
    id: number;
    message: string;
}

export interface ExpenseModel {
    id: number;
    user: UserModel;
    expense_name: string;
}
