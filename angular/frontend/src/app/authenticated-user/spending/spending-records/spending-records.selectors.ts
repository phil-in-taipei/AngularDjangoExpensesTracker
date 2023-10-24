import {createFeatureSelector, createSelector} from '@ngrx/store';

import { SpendingRecordsState } from './spending-records.reducers';
import * as fromSpendingRecords from './spending-records.reducers';


export const selectSpendingRecordsState = createFeatureSelector<SpendingRecordsState>("spending");

export const selectSpendingRecordById = (id:number) => createSelector(
    selectSpendingRecordsState,
    spendingRecordsState => spendingRecordsState.entities[id]
);

export const selectAllSpendingRecords = createSelector(
    selectSpendingRecordsState,
    fromSpendingRecords.selectAll
);

export const spendingRecordsLoaded = createSelector(
    selectSpendingRecordsState,
    spendingRecordsState => spendingRecordsState.spendingRecordsLoaded
);

export const spendingRecordsErrorMsg = createSelector(
    selectSpendingRecordsState,
    spendingRecordsState => spendingRecordsState.errorMessage
);
  
export const spendingRecordsSuccessMsg = createSelector(
    selectSpendingRecordsState,
    spendingRecordsState => spendingRecordsState.successMessage
);

