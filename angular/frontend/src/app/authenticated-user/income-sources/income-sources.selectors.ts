import {createFeatureSelector, createSelector} from '@ngrx/store';

import { IncomeSourcesState } from './income-sources.reducers';
import * as fromIncomeSources from './income-sources.reducers';

export const selectIncomeSourcesState = 
            createFeatureSelector<IncomeSourcesState>("income");


export const selectIncomeSourcesById = (id:number) => createSelector(
        selectIncomeSourcesState,
        incomeSourcesState => incomeSourcesState.entities[id]
    );

export const selectAllIncomeSources = createSelector(
        selectIncomeSourcesState,
        fromIncomeSources.selectAll
    );
        
export const incomeSourcesLoaded = createSelector(
        selectIncomeSourcesState,
        incomeSourcesState => incomeSourcesState.incomeSourcesLoaded
    );

export const incomeSourceErrorMsg = createSelector(
        selectIncomeSourcesState,
        incomeSourcesState => incomeSourcesState.errorMessage
    );
      
export const incomeSourceSuccessMsg = createSelector(
        selectIncomeSourcesState,
        incomeSourcesState => incomeSourcesState.successMessage
    );
              