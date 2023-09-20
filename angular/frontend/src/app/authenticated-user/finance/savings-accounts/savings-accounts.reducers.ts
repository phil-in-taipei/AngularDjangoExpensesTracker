import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { SavingsAccountActions, 
    SavingsAccountsActionTypes } from './savings-accounts.actions';


function compareSavingsAccountsByBankName(
    a:SavingsAccountModel, b:SavingsAccountModel) {
    const accountA = a.bank.bank_name;
    const accountB = b.bank.bank_name;
  
    let comparison = 0;
    if (accountA > accountB) {
      comparison = 1;
    } else if (accountA < accountB) {
      comparison = -1;
    }
    return comparison;
};


export interface SavingsAccountsState extends EntityState<SavingsAccountModel> {
    errorMessage: string | undefined,
    savingsAccountsLoaded:boolean;
    successMessage: string | undefined,
};

export const adapter: EntityAdapter<SavingsAccountModel> = createEntityAdapter<SavingsAccountModel>(
    { sortComparer: compareSavingsAccountsByBankName }
);

export const initialSavingsAccountsState: SavingsAccountsState = adapter.getInitialState({
    errorMessage: undefined,
    savingsAccountsLoaded: false,
    successMessage: undefined
  });


export function savingsAccountsReducer(
    state = initialSavingsAccountsState,
    action: SavingsAccountActions): SavingsAccountsState {
  
    switch(action.type) {
        case SavingsAccountsActionTypes.SavingsAccountAdded:
            return adapter.addOne(action.payload.savingsAccount, 
                { ...state,
                  errorMessage: undefined,
                  successMessage: 'You have successfully submitted a new account!'}
                );

        case SavingsAccountsActionTypes.SavingsAccountsCleared:
            return initialSavingsAccountsState;

        case SavingsAccountsActionTypes.SavingsAccountsLoaded:
            return adapter.setAll(action.payload.savingsAcounts, 
                {...state, savingsAccountsLoaded:true});


        default: {
            return state
        }
    }
};

export const {
    selectAll,
    selectEntities,
    selectIds,
  } = adapter.getSelectors();

