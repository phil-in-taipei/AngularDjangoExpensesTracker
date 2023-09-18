import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, filter, map, 
    mergeMap, withLatestFrom } from "rxjs/operators";

import { 
    BanksActionTypes, BanksLoaded, 
    BanksRequested } from './banks.actions';
import { BanksService } from './banks.service';
import { banksLoaded } from './banks.selectors';

@Injectable()
export class BanksEffects {
    loadBanks$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<BanksRequested>(BanksActionTypes.BanksRequested),
                withLatestFrom(this.store.pipe(select(banksLoaded))),
                filter(([action, banksLoaded]) => !banksLoaded),
                mergeMap(action => this.banksService.fetchAllBanks()
                    .pipe(
                        map(banks => new BanksLoaded({ banks })),
                        catchError(err => {
                            return throwError(() => err);
                        })
                    )
                )
            )
    });

    constructor(private actions$: Actions, private banksService: BanksService, 
        private store: Store<AppState>) {}
}