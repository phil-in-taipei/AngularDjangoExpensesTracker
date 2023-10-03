import { initialSavingsAccountsState, savingsAccountsReducer } from './savings-accounts.reducers';
import { createdSavingsAccount,
    savingsAccountsData
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-data';
import { stateAfterNewAccountSubmitted, stateAfterNewAccountSubmittedFailure,
     stateAfterAccountRevised, stateAfterAccountRevisedFailure,
    stateWithLoadedSavingsAccounts, revisedSavingsAccount
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-state';
import { SavingsAccountAdded, SavingsAccountAddedCancelled, 
    SavingsAccountEditCancelled, SavingsAccountEditUpdated, 
    SavingsAccountsCleared, SavingsAccountsLoaded } from './savings-accounts.actions';


fdescribe('savingsAccountsReducer', () => {
    it('returns an initial state when cleared', () =>{
        const state = savingsAccountsReducer(
            initialSavingsAccountsState, 
            new SavingsAccountsCleared());
        expect(state).toEqual(initialSavingsAccountsState);
    });

    it('returns the state with savings accounts entity and indicates that ' 
       + 'the savings accounts have been loaded', () => {
        const state = savingsAccountsReducer(initialSavingsAccountsState, 
        new SavingsAccountsLoaded({ savingsAccounts: savingsAccountsData }));
        expect(state).toEqual(stateWithLoadedSavingsAccounts.accounts);
    });

    it('returns the state with new savings accounts entity and indicates that ' 
       + 'the savings account has been sucessfully submitted', () => {
        const state = savingsAccountsReducer(stateWithLoadedSavingsAccounts.accounts, 
        new SavingsAccountAdded({ savingsAccount: createdSavingsAccount }));
        expect(state).toEqual(stateAfterNewAccountSubmitted.accounts);
    });

    it('returns the state with originally loaded savings accounts entity and indicates that ' 
        + 'submission of a new savings account has been unsucessful', () => {
        const state = savingsAccountsReducer(stateWithLoadedSavingsAccounts.accounts, 
        new SavingsAccountAddedCancelled({ err: {error: {
            Error: "Error! Savings Account Submission Failed!"
        } } }));
       expect(state).toEqual(stateAfterNewAccountSubmittedFailure.accounts);
    });


    it('returns the state with updated savings accounts entity and indicates that ' 
       + 'the savings accounts has been sucessfully revised', () => {
        const state = savingsAccountsReducer(stateWithLoadedSavingsAccounts.accounts, 
            new SavingsAccountEditUpdated({ savingsAccount: {id: 2, 
                changes: revisedSavingsAccount }})
        );
        expect(state).toEqual(stateAfterAccountRevised.accounts);
    });


    it('returns the state with originally loaded savings accounts entity and indicates that ' 
       + 'the revision of the 2nd savings account was not sucessful', () => {
        const state = savingsAccountsReducer(stateWithLoadedSavingsAccounts.accounts, 
            new SavingsAccountEditCancelled({ err: {error: {
                Error: "Error! Savings Account Update Failed!"
            } } })
        );
        expect(state).toEqual(stateAfterAccountRevisedFailure.accounts);
    });
});
