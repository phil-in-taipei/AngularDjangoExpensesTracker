import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import { initialExpensesState } from './expenses.reducers';
import { 
    createdExpense, editedExpenseData, newExpenseData,
    expenseDeletionResponse, expensesData, updatedExpense
} from 'src/app/test-data/authenticated-user-module-tests/spending-module-tests/expenses-data';
import { 
    ExpenseAdded, ExpenseDeletionRequested, ExpenseDeletionSaved,
    ExpenseEditSubmitted, ExpenseEditUpdated, ExpensesLoaded,
    ExpensesRequested, ExpenseSubmitted
} from './expenses.actions';
import { ExpensesEffects } from './expenses.effects';
import { expensesLoaded } from './expenses.selectors';
import { 
    ExpenseCreateAndUpdateModel, ExpenseDeletionResponse, ExpenseModel 
} from 'src/app/models/expense.model';
import { ExpensesService } from './expenses.service';

describe('ExpensesEffects', () => {
    let effects: ExpensesEffects;
    let expensesService: ExpensesService;

    beforeEach(() => {
        const mockExpensesService = {
            fetchAllExpenses(): Observable<ExpenseModel[]> {
                return of(expensesData);
            },
            deleteExpense(id: number): 
                Observable<ExpenseDeletionResponse> {
                    return of(expenseDeletionResponse)
            },
            submitEditedExpense(id: number, 
                    submissionForm:ExpenseCreateAndUpdateModel): 
                        Observable<ExpenseModel> {
                return of(updatedExpense);
            },
            submitNewExpense(
                submissionForm:ExpenseCreateAndUpdateModel): 
                        Observable<ExpenseModel> {
                return of(createdExpense);
            },
        };

        TestBed.configureTestingModule({    
            providers: [
                provideMockStore({
                    initialState: initialExpensesState,
                    selectors: [
                        {
                          selector: expensesLoaded,
                          value: false
                        }
                      ]
                }),
                provideMockActions(from([
                    new ExpenseDeletionRequested(
                        {id: expenseDeletionResponse.id}
                    ),
                    new ExpensesRequested(),
                    new ExpenseSubmitted(
                        { expense: newExpenseData}
                    ),
                    new ExpenseEditSubmitted(
                        { id: 2, expense: editedExpenseData}
                    )
                ])),
                ExpensesEffects,
                { provide: ExpensesService, 
                  useValue: mockExpensesService }
              ]
        });
        effects = TestBed.inject(ExpensesEffects);
        expensesService = TestBed.inject(ExpensesService);
    });

    it('ExpenseDeletionRequested should handle the deletion response with message/id ' 
        + ' by calling the save method to remove the expense from state', 
        fakeAsync(() => {
        spyOn(expensesService, 'deleteExpense')
            .and.returnValue(of(expenseDeletionResponse));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [
            new ExpenseDeletionSaved(
                expenseDeletionResponse)];
        
        effects.removeExpense$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
        }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));


    it('ExpensesRequested should call fetch the expenses' 
        + ' if they have not already been loaded into state', 
        fakeAsync(() => {
        spyOn(expensesService, 'fetchAllExpenses')
            .and.returnValue(of(expensesData));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [
            new ExpensesLoaded(
            { expenses: expensesData })];
        
        effects.loadExpenses$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
        }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));

    it('ExpenseSubmitted should submit new expense data to backend ' 
        + ' and save the returned newly created object in state', 
      fakeAsync(() => {
        spyOn(expensesService, 'submitNewExpense')
                .and.returnValue(of(createdExpense));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [new ExpenseAdded(
            { expense: createdExpense }
        )];
        
        effects.submitExpense$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
            }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));

    it('ExpenseEditSubmitted should submit an expense data object to ' 
        + 'backend and save the returned newly revised object in state', 
      fakeAsync(() => {
        spyOn(expensesService, 'submitEditedExpense')
                .and.returnValue(of(updatedExpense));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [new ExpenseEditUpdated({ 
                expense: { id: 3, changes: updatedExpense } 
            })];
        
        effects.updateExpense$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
            }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));

});
