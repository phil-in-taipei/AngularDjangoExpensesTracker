import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import { ExpenseModel } from 'src/app/models/expense.model';
import { ExpensesActions, ExpensesActionTypes } from './expenses.actions';

function compareExpensesByName(
    a:ExpenseModel, b:ExpenseModel) {
    const expenseA = a.expense_name;
    const expenseB = b.expense_name;
  
    let comparison = 0;
    if (expenseA > expenseB) {
      comparison = 1;
    } else if (expenseA < expenseB) {
      comparison = -1;
    }
    return comparison;
};

export interface ExpensesState extends EntityState<ExpenseModel> {
    errorMessage: string | undefined,
    expensesLoaded:boolean;
    successMessage: string | undefined,
};

export const adapter: EntityAdapter<ExpenseModel> = 
    createEntityAdapter<ExpenseModel>(
        { sortComparer: compareExpensesByName }
    );

export const initialExpensesState: ExpensesState = adapter.getInitialState({
    errorMessage: undefined,
    expensesLoaded: false,
    successMessage: undefined
});


export function expensesReducer(
    state = initialExpensesState,
    action: ExpensesActions): ExpensesState {


    switch(action.type) {

        case ExpensesActionTypes.ExpenseAdded:
            return adapter.addOne(action.payload.expense, 
                { ...state,
                  errorMessage: undefined,
                  successMessage: 'You have successfully submitted a new expense!'
                }
            );

        case ExpensesActionTypes.ExpenseAddedCancelled:
            let errorMessage: string = "Error! Expense Submission Failed!";
            if (action.payload.err.error.Error) {
                errorMessage = action.payload.err.error.Error;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: errorMessage
            }

        case ExpensesActionTypes.ExpenseDeletionCancelled:
            let errMsg: string = "Error! Savings Account Deletion Failed!";
            if (action.payload.err.error.Error) {
                errMsg = action.payload.err.error.Error;
            }
            return {
                    ...state,  successMessage: undefined,
                    errorMessage: errMsg
            }

        case ExpensesActionTypes.ExpenseDeletionSaved:
            return adapter.removeOne(action.payload.id, 
                { ...state,
                  errorMessage: undefined,
                  successMessage: action.payload.message
                }
            );

        case ExpensesActionTypes.ExpenseEditCancelled:
            let editErrMessage: string = "Error! Expense Update Failed!";
            if (action.payload.err.error.Error) {
                console.log(action.payload.err.error.Error)
                editErrMessage = action.payload.err.error.Error;
            }
            return {...state,  successMessage: undefined,
                errorMessage: editErrMessage
            }

        case ExpensesActionTypes.ExpenseEditUpdated:
            return adapter.updateOne(action.payload.expense, {...state,
                errorMessage:undefined,
                successMessage: 'You have successfully updated the expense info!'}
            );


        case ExpensesActionTypes.ExpensesMessagesCleared:
            return {...state,  successMessage: undefined,
               errorMessage: undefined
            }

        case ExpensesActionTypes.ExpensesCleared:
            return initialExpensesState;

        case ExpensesActionTypes.ExpensesLoaded:
            return adapter.setAll(action.payload.expenses, 
                {...state, expensesLoaded:true});

        default: {
            return state;
        }
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
  } = adapter.getSelectors();
