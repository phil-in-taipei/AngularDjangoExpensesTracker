import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, filter, map, 
    mergeMap, withLatestFrom } from "rxjs/operators";

import { CurrenciesActionTypes, CurrenciesLoaded, 
    CurrenciesRequested } from './currencies.actions';
import { CurrenciesService } from './currencies.service';
import { currenciesLoaded } from './currencies.selectors';

@Injectable()
export class CurrenciesEffects {
    loadLocations$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<CurrenciesRequested>(CurrenciesActionTypes.CurrenciesRequested),
            withLatestFrom(this.store.pipe(select(currenciesLoaded))),
            filter(([action, currenciesLoaded]) => !currenciesLoaded),
            mergeMap(action => this.currenciesService.fetchAllCurrencies()
              .pipe(
                map(currencies => new CurrenciesLoaded({ currencies })),
                catchError(err => {
                  return throwError(() => err);
                })
              ))
          )
      });

    constructor(private actions$ :Actions, private currenciesService: CurrenciesService,
              private store: Store<AppState>) {

  }
}