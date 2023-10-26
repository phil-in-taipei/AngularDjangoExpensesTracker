import { 
    ExpenseCreateAndUpdateModel, 
    ExpenseDeletionResponse, ExpenseModel 
} from "src/app/models/expense.model";
import { userProfileData } from "../user-related-tests/user-data";


export const createdExpense: ExpenseModel = {
    id: 3, expense_name: "Test Expense 3", 
    user: userProfileData.user,
};

export const editedExpenseData: ExpenseCreateAndUpdateModel = {
    expense_name: "Test Expense -- edit", 
};

export const newExpenseData: ExpenseCreateAndUpdateModel = {
    expense_name: "Test Expense 3", 
};

export const savingsAccountDeletionResponse: ExpenseDeletionResponse = {
    id: 2,
    message: "Expense successfully deleted!"
}

export const expensesData: ExpenseModel[] = [
    { 
        id: 1, expense_name: "Test Expense 1", 
        user: userProfileData.user,
    },
    { 
        id: 2, expense_name: "Test Expense 2", 
        user: userProfileData.user,
    }
];

export const expensesPostDeletionData: ExpenseModel[] = [
    expensesData[0]
];
