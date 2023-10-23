import { Action} from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { 
    ExpenseCreateAndUpdateModel, 
    ExpenseModel 
  } from 'src/app/models/expense.model';

export enum ExpensesActionTypes {
    ExpensesRequested = '[Spending Component Base Page] Expenses Requested',
    ExpensesLoaded = '[Expenses Accounts API] All Expenses Loaded',
    ExpenseSubmitted = '[Create Expenses Page] Expense Submitted',
    ExpenseAdded = '[Expenses Page] Expense Added',
    ExpenseAddedCancelled = '[Create Expense Page] Expense Added Cancelled',
    ExpenseDeletionCancelled = '[Expenses Page] Removal of Expense Cancelled',
    ExpenseDeletionRequested = '[Expenses Page]  Removal of Expense Requested',
    ExpenseDeletionSaved = '[Expenses Page] Expense Removed',
    ExpenseEditCancelled= '[Edit Expense Page] Edit Expense Cancelled',
    ExpenseEditSubmitted = '[Edit Expense Page] Edited Expense Submitted',
    ExpenseEditUpdated = '[Expenses Page] Edited Expense Updated',
    ExpensesCleared = '[AuthService User Logout] Expenses Removed',
    ExpensesMessagesCleared = '[Expenses, Edit, and Submission Pages] Expenses Messages Cleared',
};

export class ExpenseAdded implements Action {
    readonly type = ExpensesActionTypes.ExpenseAdded;
  
    constructor(public payload: 
        {  savingsAccount: ExpenseModel }) {}
}

export class ExpenseAddedCancelled implements Action {
    readonly type = ExpensesActionTypes.ExpenseAddedCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class ExpenseDeletionCancelled implements Action {
    readonly type = ExpensesActionTypes.ExpenseDeletionCancelled;
  
    constructor(public payload: {  err: any }) {
  
    }
}

export class ExpenseDeletionRequested implements Action {
    readonly type = ExpensesActionTypes.ExpenseDeletionRequested;
  
    constructor(public payload: { id: number }) {}
}

export class ExpenseDeletionSaved implements Action {
    readonly type = ExpensesActionTypes.ExpenseDeletionSaved;
  
    constructor(public payload: { id: number, message: string }) {}
}

export class ExpenseEditCancelled implements Action {
    readonly type = ExpensesActionTypes.ExpenseEditCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class ExpenseEditSubmitted implements Action {

    readonly type = ExpensesActionTypes.ExpenseEditSubmitted;
  
    constructor(public payload: 
        {  id: number, expense: ExpenseCreateAndUpdateModel }) {}
}

export class ExpenseEditUpdated implements Action {
    readonly type = ExpensesActionTypes.ExpenseEditUpdated;
  
    constructor(public payload: {  expense: Update<ExpenseModel> }) {}
}

export class ExpensesCleared implements Action {
    readonly type = ExpensesActionTypes.ExpensesCleared;
}

export class ExpensesLoaded implements Action {
    readonly type = ExpensesActionTypes.ExpensesLoaded;
  
    constructor(
        public payload: { expenses: ExpenseModel[] }
    ) {}
}

export class ExpensesMessagesCleared implements Action {
    readonly type = ExpensesActionTypes.ExpensesMessagesCleared;
}

export class ExpensesRequested implements Action {
    readonly type = ExpensesActionTypes.ExpensesRequested;
}

export class ExpenseSubmitted implements Action {
    readonly type = ExpensesActionTypes.ExpenseSubmitted;
  
    constructor(
        public payload: { expense: ExpenseCreateAndUpdateModel }
        ){}
}

export type ExpensesActions =  ExpenseAdded | 
    ExpenseEditCancelled | ExpenseEditSubmitted |
    ExpenseEditUpdated | ExpenseDeletionCancelled |
    ExpenseDeletionRequested | ExpenseDeletionSaved |
    ExpenseAddedCancelled | ExpensesCleared |
    ExpensesLoaded | ExpensesMessagesCleared |
    ExpensesRequested | ExpenseSubmitted;
 