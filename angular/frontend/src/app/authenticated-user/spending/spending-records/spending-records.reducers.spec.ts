import {
    initialSpendingRecordsState, spendingRecordsReducer 
} from "./spending-records.reducers";

import { 
    createdSpendingRecord, createdSpendingRecordNextMonth, spendingRecordsData 
} from "src/app/test-data/authenticated-user-module-tests/spending-module-tests/spending-records-data";
import { 
    stateAfterSpendingRecordDeletedFailure, stateAfterSpendingRecordDeletedSuccess,
    stateAfterNewSpendingRecordSubmittedInDateRange,
    stateAfterNewSpendingRecordSubmittedOutOfDateRange,
    stateAfterNewSpendingRecordSubmittedFailure,
    stateWithSpendingRecordsLoaded, stateAfterSpendingRecordsRequestAwaitingLoading
} from "src/app/test-data/authenticated-user-module-tests/spending-module-tests/spending-records-state";
import { 
    SpendingRecordAdded, SpendingRecordAddedCancelled,
    SpendingRecordDeletionCancelled, SpendingRecordDeletionSaved,
    SpendingRecordsCleared, SpendingRecordsLoaded, SpendingRecordsRequested
} from "./spending-records.actions";

describe('spendingRecordsReducer', () => {
    it('returns an initial state when cleared', () =>{
        const state = spendingRecordsReducer(
            stateWithSpendingRecordsLoaded.spending, 
            new SpendingRecordsCleared());
        expect(state).toEqual(initialSpendingRecordsState);
    });

    it('returns the state with spending records date range and indicates that ' 
    + 'the spending records have not yet been loaded after request for monthly spending records', 
        () => {
        const today: Date = new Date();
        const state = spendingRecordsReducer(stateAfterSpendingRecordsRequestAwaitingLoading.spending, 
            new SpendingRecordsRequested({ month: today.getMonth() + 1, year: today.getFullYear() }));
        expect(state).toEqual(stateAfterSpendingRecordsRequestAwaitingLoading.spending);
    });

    it('returns the state with spending records entity and indicates that ' 
    + 'the spending records have been loaded', () => {
     const state = spendingRecordsReducer(stateAfterSpendingRecordsRequestAwaitingLoading.spending, 
     new SpendingRecordsLoaded({ spendingRecords: spendingRecordsData }));
     expect(state).toEqual(stateWithSpendingRecordsLoaded.spending);
    });

    it('returns the state with new spending record entity and indicates that ' 
        + 'the spending record has been sucessfully submitted -- ' 
        + 'if the new spending record is within the date range', () => {
        const state = spendingRecordsReducer(stateWithSpendingRecordsLoaded.spending, 
        new SpendingRecordAdded({ spendingRecord: createdSpendingRecord }));
        expect(state).toEqual(stateAfterNewSpendingRecordSubmittedInDateRange.spending);
    });

    it('returns the state without the new spending record entity and indicates that ' 
        + 'the spending record has been sucessfully submitted -- ' 
        + 'if the new spending record is in not within the date range', () => {
        const state = spendingRecordsReducer(stateWithSpendingRecordsLoaded.spending, 
        new SpendingRecordAdded({ spendingRecord: createdSpendingRecordNextMonth }));
        expect(state).toEqual(stateAfterNewSpendingRecordSubmittedOutOfDateRange.spending);
    });

    it('returns the state with originally loaded spending records entity and indicates that ' 
        + 'submission of a new object has been unsucessful', () => {
        const state = spendingRecordsReducer(stateWithSpendingRecordsLoaded.spending, 
        new SpendingRecordAddedCancelled({ err: {error: {
            Error: "Error! Spending Record Submission Failed!"
        } } }));
       expect(state).toEqual(stateAfterNewSpendingRecordSubmittedFailure.spending);
    });

    it('returns the original state with one less spending record entity and indicates that ' 
       + 'the third spending record has been sucessfully deleted', () => {
        const state = spendingRecordsReducer(
            stateAfterNewSpendingRecordSubmittedInDateRange.spending, 
        new SpendingRecordDeletionSaved({ 
            id: 3, 
            message: stateAfterSpendingRecordDeletedSuccess.spending.successMessage 
        }));
        expect(state).toEqual(stateAfterSpendingRecordDeletedSuccess.spending);
    });
    
    it('returns the state after an spending recrod entity has been added ' 
    + 'and indicates that the deletion of the third spending record failed', () => {
        const state = spendingRecordsReducer(
            stateAfterNewSpendingRecordSubmittedInDateRange.spending, 
        new SpendingRecordDeletionCancelled({ 
            err: {
                error: {
                    Error: "Error! Spending Record Deletion Failed!"
                }
            } 
        }));
        expect(state).toEqual(stateAfterSpendingRecordDeletedFailure.spending);
    });

});