import { initialExpensesState, ExpensesState, expensesReducer } from "./expenses.reducers";

import { 
    createdExpense, expensesData 
} from "src/app/test-data/authenticated-user-module-tests/spending-module-tests/expenses-data";
import { 
    stateAfterExpenseDeletedFailure, stateAfterExpenseDeletedSuccess,
    stateAfterExpenseRevised, stateAfterExpenseRevisedFailure,
    stateAfterNewExpenseSubmitted, stateAfterNewExpenseSubmittedFailure,
    stateWithLoadedExpenses, revisedExpense
} from "src/app/test-data/authenticated-user-module-tests/spending-module-tests/expenses-state";
import { 
    ExpenseAdded, ExpenseAddedCancelled,
    ExpenseDeletionCancelled, ExpenseDeletionSaved,
    ExpenseEditCancelled, ExpenseEditUpdated,
    ExpensesCleared, ExpensesLoaded
} from "./expenses.actions";


describe('expensesReducer', () => {
    it('returns an initial state when cleared', () =>{
        const state = expensesReducer(
            initialExpensesState, 
            new ExpensesCleared());
        expect(state).toEqual(initialExpensesState);
    });

    it('returns the state with expenses entity and indicates that ' 
    + 'the expenses have been loaded', () => {
     const state = expensesReducer(initialExpensesState, 
     new ExpensesLoaded({ expenses: expensesData }));
     expect(state).toEqual(stateWithLoadedExpenses.expenses);
    });

    it('returns the state with new expense entity and indicates that ' 
        + 'the expense has been sucessfully submitted', () => {
        const state = expensesReducer(stateWithLoadedExpenses.expenses, 
        new ExpenseAdded({ expense: createdExpense }));
        expect(state).toEqual(stateAfterNewExpenseSubmitted.expenses);
    });

    it('returns the state with originally loaded expenses entity and indicates that ' 
        + 'submission of a new expense has been unsucessful', () => {
        const state = expensesReducer(stateWithLoadedExpenses.expenses, 
        new ExpenseAddedCancelled({ err: {error: {
            Error: "Error! Expense Submission Failed!"
        } } }));
       expect(state).toEqual(stateAfterNewExpenseSubmittedFailure.expenses);
    });

    it('returns the state with updated expense entity and indicates that ' 
       + 'an expense has been sucessfully revised', () => {
        const state = expensesReducer(stateWithLoadedExpenses.expenses, 
            new ExpenseEditUpdated({ expense: {id: 2, 
                changes: revisedExpense }})
        );
        expect(state).toEqual(stateAfterExpenseRevised.expenses);
    });

    it('returns the state with originally loaded expenses entity and indicates that ' 
       + 'the revision of the 2nd expense was not sucessful', () => {
        const state = expensesReducer(stateWithLoadedExpenses.expenses, 
            new ExpenseEditCancelled({ err: {error: {
                Error: "Error! Expense Update Failed!"
            } } })
        );
        expect(state).toEqual(stateAfterExpenseRevisedFailure.expenses);
    });

    it('returns the original state with one less expense entity and indicates that ' 
       + 'the third expense has been sucessfully deleted', () => {
        const state = expensesReducer(stateAfterNewExpenseSubmitted.expenses, 
        new ExpenseDeletionSaved({ 
            id: 3, 
            message: stateAfterExpenseDeletedSuccess.expenses.successMessage 
        }));
        expect(state).toEqual(stateAfterExpenseDeletedSuccess.expenses);
    });
    
    it('returns the state after an expense entity has been added ' 
    + 'and indicates that the deletion of the third expense failed', () => {
        const state = expensesReducer(stateAfterNewExpenseSubmitted.expenses, 
        new ExpenseDeletionCancelled({ 
            err: {
                error: {
                    Error: "Error! Expense Deletion Failed!"
                }
            } 
        }));
        expect(state).toEqual(stateAfterExpenseDeletedFailure.expenses);
    });

});