import { 
    initialSavingsAccountsState, savingsAccountsReducer 
} from './savings-accounts.reducers';
import { 
    createdSavingsAccount, savingsAccountsData
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-data';
import {
    stateAfterAccountDeletedSuccess, stateAfterAccountDeletedFailure,
    stateAfterNewAccountSubmitted, stateAfterNewAccountSubmittedFailure,
    stateAfterAccountRevised, stateAfterAccountRevisedFailure,
    stateWithLoadedSavingsAccounts, revisedSavingsAccount, 
    revisedSavingsAccountAfterDeposit,
    stateAfterAccountRevisedDueToDeposit, stateAfterAccountRevisedDueToDepositDeletion, 
    stateAfterAccountRevisedDueToWithdrawal
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-state';

import { 
    SavingsAccountAdded, SavingsAccountAddedCancelled, 
    SavingsAccountDeletionCancelled, SavingsAccountDeletionSaved,
    SavingsAccountDepositSaved, SavingsAccountDepositDeletionSaved,
    SavingsAccountWithdrawalSaved, SavingsAccountWithdrawalDeletionSaved, 
    SavingsAccountEditCancelled, SavingsAccountEditUpdated, 
    SavingsAccountsCleared, SavingsAccountsLoaded 
} from './savings-accounts.actions';


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

    it('returns the state with updated savings accounts entity following succesful ' 
       + 'submission of deposit (of 200.00 -- string) and indicates that ' 
       + 'the savings account balance has been sucessfully revised', () => {
        const state = savingsAccountsReducer(stateWithLoadedSavingsAccounts.accounts, 
            new SavingsAccountDepositSaved(
                { amount: '200.00', savingsAccount: savingsAccountsData[1]}
            )
        );
        expect(state).toEqual(stateAfterAccountRevisedDueToDeposit.accounts);
    });

    it('returns the state with original savings accounts entity following succesful ' 
       + 'deletion of deposit (of 200.00 -- number) and indicates that ' 
       + 'the savings account balance has been sucessfully revised', () => {
        const state = savingsAccountsReducer(stateAfterAccountRevisedDueToDeposit.accounts, 
            new SavingsAccountDepositDeletionSaved(
                { amount: 200.00, savingsAccount: revisedSavingsAccountAfterDeposit }
            )
        );
        expect(state).toEqual(stateAfterAccountRevisedDueToDepositDeletion.accounts);
    });

    // this uses the same state as if there had been a deposit
    // so the account balance is updated from 200 to 0
    it('returns the state with updated savings accounts entity following succesful ' 
       + 'submission of withdrawal (of 200.00 -- string) and indicates that ' 
       + 'the savings account balance has been sucessfully revised', () => {
        const state = savingsAccountsReducer(stateAfterAccountRevisedDueToDeposit.accounts, 
            new SavingsAccountWithdrawalSaved(
                { amount: '200.00', savingsAccount: revisedSavingsAccountAfterDeposit }
            )
        );
        expect(state).toEqual(stateAfterAccountRevisedDueToWithdrawal.accounts);
    });

    // this uses the same state as if there had been a deposit of 200
    // prior to making the withdrawal. so the account balance was 0 prior to 
    // deleting the withdrawal and is now 200 again 
    it('returns the state with updated savings accounts entity following succesful ' 
       + 'submission of withdrawal (of 200.00 -- string) and indicates that ' 
       + 'the savings account balance has been sucessfully revised', () => {
        const state = savingsAccountsReducer(stateAfterAccountRevisedDueToWithdrawal.accounts, 
            new SavingsAccountWithdrawalDeletionSaved(
                { amount: 200.00, savingsAccount: savingsAccountsData[1] }
            )
        );
        expect(state).toEqual(stateAfterAccountRevisedDueToDeposit.accounts);
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

    it('returns the original state with one less savings accounts entity and indicates that ' 
       + 'the third savings account has been sucessfully deleted', () => {
        const state = savingsAccountsReducer(stateAfterNewAccountSubmitted.accounts, 
        new SavingsAccountDeletionSaved({ 
            id: 3, 
            message: stateAfterAccountDeletedSuccess.accounts.successMessage 
        }));
        expect(state).toEqual(stateAfterAccountDeletedSuccess.accounts);
    });

    it('returns the state after savings accounts entity has been added ' 
    + 'and indicates that the deletion of the third savings account failed', () => {
        const state = savingsAccountsReducer(stateAfterNewAccountSubmitted.accounts, 
        new SavingsAccountDeletionCancelled({ 
            err: {
                error: {
                    Error: "Error! Savings Account Deletion Failed!"
                }
            } 
        }));
        expect(state).toEqual(stateAfterAccountDeletedFailure.accounts);
    });
});
