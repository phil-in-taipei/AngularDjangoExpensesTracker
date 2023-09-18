import {createFeatureSelector, createSelector} from '@ngrx/store';

import { BanksState } from './banks.reducers';
import * as fromBanks from './banks.reducers';

export const selectBanksState = createFeatureSelector<BanksState>("banks");

export const selectAllBanks = createSelector(
    selectBanksState,
    fromBanks.selectAll
);

export const banksLoaded = createSelector(
    selectBanksState,
    banksState => banksState.banksLoaded
);
