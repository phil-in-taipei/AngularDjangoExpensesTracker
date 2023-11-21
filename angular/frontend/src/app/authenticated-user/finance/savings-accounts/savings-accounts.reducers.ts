import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';


import {
    SavingsAccountModel
} from 'src/app/models/savings-account.model';
import {
    SavingsAccountActions, SavingsAccountsActionTypes
} from './savings-accounts.actions';


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

export const adapter: EntityAdapter<SavingsAccountModel> =
    createEntityAdapter<SavingsAccountModel>(
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
                  successMessage: 'You have successfully submitted a new account!'
                }
            );

        case SavingsAccountsActionTypes.SavingsAccountAddedCancelled:
            console.log('error adding savings account!');
            console.log(action.payload);
            let errorMessage: string = "Error! Savings Account Submission Failed!";
            if (action.payload.err.error.Error) {
                //console.log(action.payload.err.error.Error)
                errorMessage = action.payload.err.error.Error;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: errorMessage
            }

        case SavingsAccountsActionTypes.SavingsAccountDepositSaved:
            // clone with spead operator and add the new value before saving the clone
            let savingsAccount = { ...action.payload.savingsAccount }
            console.log('this is the account balance prior to ')
            console.log(savingsAccount.account_balance)
            let newBalance:number = +savingsAccount.account_balance + +action.payload.amount
            savingsAccount.account_balance = (Math.round(newBalance * 100) / 100).toFixed(2).toString();
        
            console.log('this is the new account balance:')
            console.log(savingsAccount.account_balance);
            return adapter.updateOne(
                {
                    id: action.payload.savingsAccount.id,
                    changes: savingsAccount
                },
                {
                    ...state, errorMessage:undefined,
                    successMessage: 'You have successfully updated the account info!'
                }
            );

        case SavingsAccountsActionTypes.SavingsAccountWithdrawalSaved:
            // clone with spead operator and add the new value before saving the clone
            let updatedAccount = { ...action.payload.savingsAccount }
            console.log('this is the account balance prior to ')
            console.log(updatedAccount.account_balance)
            let balance:number = +updatedAccount.account_balance - +action.payload.amount
            updatedAccount.account_balance = (Math.round(balance * 100) / 100).toFixed(2).toString();
            
            console.log('this is the new account balance:')
            console.log(updatedAccount.account_balance);
            return adapter.updateOne(
                {
                    id: action.payload.savingsAccount.id,
                    changes: updatedAccount
                },
                {
                    ...state, errorMessage:undefined,
                    successMessage: 'You have successfully updated the account info!'
                }
            );
    

        case SavingsAccountsActionTypes.SavingsAccountDepositDeletionSaved:
            // clone with spead operator and add the new value before saving the clone
            let account = { ...action.payload.savingsAccount }
            console.log('this is the account balance prior to ')
            console.log(account.account_balance)
            let updatedBalance:number = +account.account_balance - +action.payload.amount
            account.account_balance = (Math.round(updatedBalance * 100) / 100).toFixed(2).toString();
            
            console.log('this is the new account balance:')
            console.log(account.account_balance);
            return adapter.updateOne(
                {
                    id: action.payload.savingsAccount.id,
                    changes: account
                },
                {
                    ...state, errorMessage:undefined,
                    successMessage: 'You have successfully updated the account info!'
                }
            ); 

    

        case SavingsAccountsActionTypes.SavingsAccountWithdrawalDeletionSaved:
            // clone with spead operator and add the new value before saving the clone
            let accountClone = { ...action.payload.savingsAccount }
            console.log('this is the account balance prior to ')
            console.log(accountClone.account_balance)
            let revisedBalance:number = +accountClone.account_balance + +action.payload.amount
            accountClone.account_balance = (Math.round(revisedBalance * 100) / 100).toFixed(2).toString();
                
            console.log('this is the new account balance:')
            console.log(accountClone.account_balance);
            return adapter.updateOne(
                {
                    id: action.payload.savingsAccount.id,
                    changes: accountClone
                 },
                {
                    ...state, errorMessage:undefined,
                    successMessage: 'You have successfully updated the account info!'
                }
            ); 
    
    

        case SavingsAccountsActionTypes.SavingsAccountDeletionCancelled:
            let errMsg: string = "Error! Savings Account Deletion Failed!";
            if (action.payload.err.error.Error) {
                //console.log(action.payload.err.error.Error)
                errMsg = action.payload.err.error.Error;
            }
            return {
                    ...state,  successMessage: undefined,
                    errorMessage: errMsg
            }

        case SavingsAccountsActionTypes.SavingsAccountDeletionSaved:
            //console.log('now deleting the account')
            //console.log(action.payload);
            return adapter.removeOne(action.payload.id,
                { ...state,
                  errorMessage: undefined,
                  successMessage: action.payload.message
                }
            );

        case SavingsAccountsActionTypes.SavingsAccountEditCancelled:
            let editErrMessage: string = "Error! Savings Account Update Failed!";
            if (action.payload.err.error.Error) {
                console.log(action.payload.err.error.Error)
                editErrMessage = action.payload.err.error.Error;
            }
            return {...state,  successMessage: undefined,
                errorMessage: editErrMessage
            }

        case SavingsAccountsActionTypes.SavingsAccountEditUpdated:
            console.log('attempting alternative updating approach')
            return adapter.updateOne(action.payload.savingsAccount,
                {
                    ...state, errorMessage:undefined,
                    successMessage: 'You have successfully updated the account info!'
                }
            );

        case SavingsAccountsActionTypes.SavingsAccountsCleared:
            return initialSavingsAccountsState;

        case SavingsAccountsActionTypes.SavingsAccountsLoaded:
            return adapter.setAll(action.payload.savingsAccounts,
                {...state, savingsAccountsLoaded:true});

        case SavingsAccountsActionTypes.SavingsAccountsMessagesCleared:
            return {...state,  successMessage: undefined,
               errorMessage: undefined
            }

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
