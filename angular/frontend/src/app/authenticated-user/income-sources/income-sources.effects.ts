import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { throwError, of } from 'rxjs';
import { catchError, filter, map,
    mergeMap, withLatestFrom } from "rxjs/operators";

import { 
    IncomeSourcesActionTypes,
    IncomeSourceAdded, IncomeSourceAddedCancelled,
    IncomeSourceDeletionCancelled, IncomeSourceDeletionRequested,
    IncomeSourceDeletionSaved, IncomeSourceEditCancelled,  
    IncomeSourceEditSubmitted, IncomeSourceEditUpdated,
    IncomeSourceSubmitted, IncomeSourcesCleared, 
    IncomeSourcesLoaded, IncomeSourcesRequested
} from './income-sources.actions';

import { IncomeSourcesService } from './income-sources.service';
import { incomeSourcesLoaded } from './income-sources.selectors';

@Injectable()
export class IncomeSourcesEffects {
    loadIncomeSources$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<IncomeSourcesRequested>(IncomeSourcesActionTypes
                    .IncomeSourcesRequested),
                        withLatestFrom(this.store.pipe(
                            select(incomeSourcesLoaded))
                        ),
                        filter(
                            ([action, incomeSourcesLoaded]) => !incomeSourcesLoaded),
                        mergeMap(action => this.incomeSourcesService
                            .fetchAllIncomeSources()
                                .pipe(
                                    map(incomeSources => new IncomeSourcesLoaded(
                                        { incomeSources })
                                    ),
                                    catchError(err => {
                                        return throwError(() => err);
                                    })
                                )
                        )
            )
    });

    removeIncomeSource$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<IncomeSourceDeletionRequested>(
                    IncomeSourcesActionTypes.IncomeSourceDeletionRequested),
                    mergeMap(action => this.incomeSourcesService
                        .deleteIncomeSource(action.payload.id)
                            .pipe(
                                map(deletionResponse => new IncomeSourceDeletionSaved(
                                    deletionResponse)
                                ),
                                catchError(err => {
                                    this.store.dispatch(
                                        new IncomeSourceDeletionCancelled({ err })
                                    );
                                    return of();
                                })
                            )
                    )
            )
    });

    submitIncomeSource$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<IncomeSourceSubmitted>(
                    IncomeSourcesActionTypes.IncomeSourceSubmitted),
                    mergeMap(action => this.incomeSourcesService
                        .submitNewIncomeSource(
                            action.payload.incomeSource,
                            ).pipe(catchError(err => {
                                this.store.dispatch(
                                    new IncomeSourceAddedCancelled({ err })
                                );
                                return of();
                            }),
                        )
                  ),
                  map(incomeSource => new IncomeSourceAdded({ incomeSource }),
                  )
            )
    });

    updateIncomeSource$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<IncomeSourceEditSubmitted>(
                    IncomeSourcesActionTypes.IncomeSourceEditSubmitted),
                    mergeMap(action => this.incomeSourcesService
                        .submitEditedIncomeSource(
                            action.payload.id,
                            action.payload.incomeSource
                            ).pipe(catchError(err => {
                                this.store.dispatch(
                                    new IncomeSourceEditCancelled({ err })
                                );
                                return of();
                            }),
                        )
                  ),
                  map(incomeSource => new IncomeSourceEditUpdated(
                    { incomeSource:
                        { id: incomeSource.id, changes: incomeSource }
                    }),
                )
            )
    });

    constructor(
        private actions$: Actions, 
        private incomeSourcesService: IncomeSourcesService, 
        private store: Store<AppState>
    ) {}
}