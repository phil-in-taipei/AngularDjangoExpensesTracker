import {createFeatureSelector, createSelector} from '@ngrx/store';

import { CurrenciesState } from './currencies.reducers';
import * as fromCurrencies from './currencies.reducers';

export const selectCurrenciesState = createFeatureSelector<CurrenciesState>("currencies");

export const selectAllCurrencies = createSelector(
    selectCurrenciesState,
    fromCurrencies.selectAll
  );

export const currenciesLoaded = createSelector(
    selectCurrenciesState,
    currenciesState => currenciesState.currenciesLoaded
  );
