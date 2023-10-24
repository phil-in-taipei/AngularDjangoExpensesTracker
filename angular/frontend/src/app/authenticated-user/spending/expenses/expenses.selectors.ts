import {createFeatureSelector, createSelector} from '@ngrx/store';

import { ExpensesState } from './expenses.reducers';
import * as fromExpenses from './expenses.reducers';

export const selectExpensesState = createFeatureSelector<ExpensesState>("expenses");

export const selectExpenseById = (id:number) => createSelector(
    selectExpensesState,
    expensesState => expensesState.entities[id]
);

export const selectAllExpenses = createSelector(
    selectExpensesState,
    fromExpenses.selectAll
);

export const expensesLoaded = createSelector(
    selectExpensesState,
    expensesState => expensesState.expensesLoaded
);

export const expensesErrorMsg = createSelector(
    selectExpensesState,
    expensesState => expensesState.errorMessage
);
  
export const expensesSuccessMsg = createSelector(
    selectExpensesState,
    expensesState => expensesState.successMessage
);

