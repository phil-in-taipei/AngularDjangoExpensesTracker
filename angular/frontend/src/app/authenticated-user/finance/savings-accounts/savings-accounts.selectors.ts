import {createFeatureSelector, createSelector} from '@ngrx/store';

import { SavingsAccountsState } from './savings-accounts.reducers';
import * as fromSavingsAccounts from './savings-accounts.reducers';

export const selectSavingsAccountsState = createFeatureSelector<SavingsAccountsState>("accounts");

export const selectSavingsAccountById = (id:number) => createSelector(
    selectSavingsAccountsState,
    savingsAccountState => savingsAccountState.entities[id]
);

export const selectAllSavingsAccounts = createSelector(
    selectSavingsAccountsState,
    fromSavingsAccounts.selectAll
);

export const savingsAccountsLoaded = createSelector(
    selectSavingsAccountsState,
    savingsAccountState => savingsAccountState.savingsAccountsLoaded
);


export const savingsAccountErrorMsg = createSelector(
    selectSavingsAccountsState,
    savingsAccountState => savingsAccountState.errorMessage
  );
  
  export const savingsAccountSuccessMsg = createSelector(
    selectSavingsAccountsState,
    savingsAccountState => savingsAccountState.successMessage
  );
