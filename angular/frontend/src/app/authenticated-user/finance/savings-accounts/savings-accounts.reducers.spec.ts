import { initialSavingsAccountsState, savingsAccountsReducer } from './savings-accounts.reducers';
import { 
    savingsAccountsData
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-data';
import { 
    stateWithLoadedSavingsAccounts 
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-state';
import { SavingsAccountsCleared, SavingsAccountsLoaded } from './savings-accounts.actions';


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
});
