import { Action } from '@ngrx/store';

import { CurrencyModel } from 'src/app/models/currency.model';

export enum CurrenciesActionTypes {
    CurrenciesRequested = '[View Authenticated User Page] Currencies Requested',
    CurrenciesLoaded = '[Currencies API] Currencies Loaded',
    CurrenciesCleared = '[View User Logout] Currencies Removed',
}

export class CurrenciesCleared implements Action {
    readonly type = CurrenciesActionTypes.CurrenciesCleared;
}

export class CurrenciesLoaded implements Action {
    readonly type = CurrenciesActionTypes.CurrenciesLoaded;
  
    constructor(
        public payload: { currencies: CurrencyModel[] }
        ) {}
}

export class CurrenciesRequested implements Action {
    readonly type = CurrenciesActionTypes.CurrenciesRequested;
}

export type CurrenciesActions = CurrenciesCleared 
    | CurrenciesLoaded | CurrenciesRequested;