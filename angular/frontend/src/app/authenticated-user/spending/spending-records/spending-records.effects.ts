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
  SpendingRecordAdded, SpendingRecordAddedCancelled, 
  SpendingRecordDeletionCancelled, SpendingRecordDeletionRequested,
  SpendingRecordDeletionSaved, SpendingRecordSubmitted, 
  SpendingRecordsActionTypes, SpendingRecordsLoaded, SpendingRecordsRequested
} from './spending-records.actions';
import { SpendingRecordsService } from './spending-records.service';
import { spendingRecordsLoaded } from './spending-records.selectors';

@Injectable()
export class SpendingRecordsEffects {
  loadSpendingRecords$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType<SpendingRecordsRequested>(SpendingRecordsActionTypes
          .SpendingRecordsRequested),
              withLatestFrom(this.store.pipe(
                  select(spendingRecordsLoaded))
               ),
              filter(
                ([action, spendingRecordsLoaded]) => !spendingRecordsLoaded),
              mergeMap(action => this.spendingRecordsService
                .fetchSpendingRecordsByMonthAndYear()
                    .pipe(
                        map(spendingRecords => new SpendingRecordsLoaded(
                            { spendingRecords })
                        ),
                        catchError(err => {
                            return throwError(() => err);
                        })
                    )
            )
      )
  });


  removeSpendingRecord$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType<SpendingRecordDeletionRequested>(
          SpendingRecordsActionTypes.SpendingRecordDeletionRequested),
            mergeMap(action => this.spendingRecordsService
              .deleteSpendingRecord(action.payload.id)
                .pipe(
                    map(deletionResponse => new SpendingRecordDeletionSaved(
                        deletionResponse)
                    ),
                    catchError(err => {
                        this.store.dispatch(
                            new SpendingRecordDeletionCancelled({ err })
                        );
                        return of();
                    })
                )
          )
      )
  });  


  submitSpendingRecord$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType<SpendingRecordSubmitted>(
            SpendingRecordsActionTypes.SpendingRecordSubmitted),
              mergeMap(action => this.spendingRecordsService
                .submitNewSpendingRecord(
                  action.payload.spendingRecord,
                  ).pipe(catchError(err => {
                      this.store.dispatch(
                        new SpendingRecordAddedCancelled({ err })
                      );
                    return of();
                  }),
                )
            ),
            map(spendingRecord => new SpendingRecordAdded(
              { spendingRecord }
            ),
          )
        )
  });



  constructor(private actions$: Actions, 
    private spendingRecordsService: SpendingRecordsService, 
    private store: Store<AppState>) {}
}
