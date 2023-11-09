import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../reducers';
import { select, Store } from '@ngrx/store';
import { throwError, of } from 'rxjs';
import { catchError, filter, map,
    mergeMap, withLatestFrom } from "rxjs/operators";

import { 
    SavingsAccountAdded, SavingsAccountAddedCancelled, 
    SavingsAccountEditCancelled, SavingsAccountEditSubmitted,
    SavingsAccountEditUpdated, SavingsAccountDeletionCancelled,
    SavingsAccountDeletionRequested, SavingsAccountDeletionSaved,
    SavingsAccountSubmitted, SavingsAccountsActionTypes, 
    SavingsAccountsLoaded, SavingsAccountsRequested 
} from './savings-accounts.actions';
import { SavingsAccountsService } from './savings-accounts.service';
import { savingsAccountsLoaded } from './savings-accounts.selectors';

@Injectable()
export class SavingsAccountsEffects {
    loadSavingsAccounts$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<SavingsAccountsRequested>(SavingsAccountsActionTypes
                    .SavingsAccountsRequested),
                        withLatestFrom(this.store.pipe(
                            select(savingsAccountsLoaded))
                        ),
                        filter(
                            ([action, savingsAccountsLoaded]) => !savingsAccountsLoaded),
                        mergeMap(action => this.savingsAccountsService
                            .fetchAllSavingsAccounts()
                                .pipe(
                                    map(savingsAccounts => new SavingsAccountsLoaded(
                                        { savingsAccounts })
                                    ),
                                    catchError(err => {
                                        return throwError(() => err);
                                    })
                                )
                        )
            )
    });

    removeSavingsAccount$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<SavingsAccountDeletionRequested>(
                    SavingsAccountsActionTypes.SavingsAccountDeletionRequested),
                    mergeMap(action => this.savingsAccountsService
                        .deleteSavingsAccount(action.payload.id)
                            .pipe(
                                map(deletionResponse => new SavingsAccountDeletionSaved(
                                    deletionResponse)
                                ),
                                catchError(err => {
                                    this.store.dispatch(
                                        new SavingsAccountDeletionCancelled({ err })
                                    );
                                    return of();
                                })
                            )
                    )
            )
    });  

    submitSavingsAccount$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<SavingsAccountSubmitted>(
                    SavingsAccountsActionTypes.SavingsAccountSubmitted),
                    mergeMap(action => this.savingsAccountsService
                        .submitNewSavingsAccount(
                            action.payload.savingsAccount,
                            ).pipe(catchError(err => {
                                this.store.dispatch(
                                    new SavingsAccountAddedCancelled({ err })
                                );
                                return of();
                            }),
                        )
                  ),
                  map(savingsAccount => new SavingsAccountAdded({ savingsAccount }),
                  )
            )
    });

    updateSavingsAccount$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<SavingsAccountEditSubmitted>(
                    SavingsAccountsActionTypes.SavingsAccountEditSubmitted),
                    mergeMap(action => this.savingsAccountsService
                        .submitEditedSavingsAccount(
                            action.payload.id,
                            action.payload.savingsAccount
                            ).pipe(catchError(err => {
                                this.store.dispatch(
                                    new SavingsAccountEditCancelled({ err })
                                );
                                return of();
                            }),
                        )
                  ),
                  map(savingsAccount => new SavingsAccountEditUpdated(
                    { savingsAccount
                        //{ id: savingsAccount.id, changes: savingsAccount}
                    }),
                )
            )
    });

    constructor(private actions$: Actions, 
        private savingsAccountsService: SavingsAccountsService, 
        private store: Store<AppState>) {}
}