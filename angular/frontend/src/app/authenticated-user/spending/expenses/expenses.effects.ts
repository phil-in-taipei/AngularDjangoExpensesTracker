import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../reducers';
import { select, Store } from '@ngrx/store';
import { throwError, of } from 'rxjs';
import { 
    catchError, filter, map,
    mergeMap, withLatestFrom 
} from "rxjs/operators";

import { 
    ExpenseAdded, ExpenseAddedCancelled,
    ExpenseDeletionCancelled, ExpenseDeletionRequested, 
    ExpenseDeletionSaved, ExpenseEditCancelled, 
    ExpenseEditSubmitted, ExpenseEditUpdated, 
    ExpenseSubmitted, ExpensesActionTypes, 
    ExpensesLoaded, ExpensesRequested 
} from './expenses.actions';
import { ExpensesService } from './expenses.service';
import { expensesLoaded } from './expenses.selectors';

@Injectable()
export class ExpensesEffects {
    loadExpenses$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<ExpensesRequested>(ExpensesActionTypes
                    .ExpensesRequested),
                        withLatestFrom(this.store.pipe(
                            select(expensesLoaded))
                        ),
                        filter(
                            ([action, expensesLoaded]) => !expensesLoaded),
                        mergeMap(action => this.expensesService
                            .fetchAllExpenses()
                                .pipe(
                                    map(expenses => new ExpensesLoaded(
                                        { expenses })
                                    ),
                                    catchError(err => {
                                        return throwError(() => err);
                                    })
                                )
                        )
            )
    });


    removeExpense$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<ExpenseDeletionRequested>(
                    ExpensesActionTypes.ExpenseDeletionRequested),
                    mergeMap(action => this.expensesService
                        .deleteExpense(action.payload.id)
                            .pipe(
                                map(deletionResponse => new ExpenseDeletionSaved(
                                    deletionResponse)
                                ),
                                catchError(err => {
                                    this.store.dispatch(
                                        new ExpenseDeletionCancelled({ err })
                                    );
                                    return of();
                                })
                            )
                    )
            )
    });  


    submitExpense$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<ExpenseSubmitted>(
                    ExpensesActionTypes.ExpenseSubmitted),
                    mergeMap(action => this.expensesService
                        .submitNewExpense(
                            action.payload.expense,
                            ).pipe(catchError(err => {
                                this.store.dispatch(
                                    new ExpenseAddedCancelled({ err })
                                );
                                return of();
                            }),
                        )
                  ),
                  map(expense => new ExpenseAdded({ expense }),
                  )
            )
    });


    updateExpense$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<ExpenseEditSubmitted>(
                    ExpensesActionTypes.ExpenseEditSubmitted),
                    mergeMap(action => this.expensesService
                        .submitEditedExpense(
                            action.payload.id,
                            action.payload.expense
                            ).pipe(catchError(err => {
                                this.store.dispatch(
                                    new ExpenseEditCancelled({ err })
                                );
                                return of();
                            }),
                        )
                  ),
                  map(expense => new ExpenseEditUpdated(
                    { expense:
                        { id: expense.id, changes: expense}
                    }),
                )
            )
    });

    constructor(private actions$: Actions, 
        private expensesService: ExpensesService, 
        private store: Store<AppState>) {}
}
