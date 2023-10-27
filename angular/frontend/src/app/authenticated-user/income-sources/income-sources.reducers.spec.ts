import { 
    initialIncomeSourcesState, incomeSourcesReducer 
} from "./income-sources.reducers";

import { 
    createdIncomeSource, incomeSourcesData 
} from "src/app/test-data/authenticated-user-module-tests/income-sources-tests/income-sources-data";

import { 
    stateAfterIncomeSourceDeletedFailure,stateAfterIncomeSourceDeletedSuccess, 
    stateAfterIncomeSourceRevised, stateAfterIncomeSourceRevisedFailure,
    stateAfterNewIncomeSourceSubmitted, stateAfterNewIncomeSourceSubmittedFailure,
    stateWithLoadedIncomeSources, revisedIncomeSource
} from "src/app/test-data/authenticated-user-module-tests/income-sources-tests/income-sources-state";

import { 
    IncomeSourceAdded, IncomeSourceAddedCancelled,
    IncomeSourceDeletionCancelled, IncomeSourceDeletionRequested,
    IncomeSourceDeletionSaved, IncomeSourceEditCancelled,
    IncomeSourceEditSubmitted, IncomeSourceEditUpdated,
    IncomeSourcesCleared, IncomeSourcesLoaded
} from "./income-sources.actions";

describe('incomeSourcesReducer', () => {
    it('returns an initial state when cleared', () =>{
        const state = incomeSourcesReducer(
            initialIncomeSourcesState, 
            new IncomeSourcesCleared());
        expect(state).toEqual(initialIncomeSourcesState);
    });

    it('returns the state with income sources entity and indicates that ' 
    + 'the income sources have been loaded', () => {
     const state = incomeSourcesReducer(initialIncomeSourcesState, 
     new IncomeSourcesLoaded({ incomeSources: incomeSourcesData }));
     expect(state).toEqual(stateWithLoadedIncomeSources.income);
    });

    it('returns the state with new income sources entity and indicates that ' 
        + 'the income source has been sucessfully submitted', () => {
        const state = incomeSourcesReducer(stateWithLoadedIncomeSources.income, 
        new IncomeSourceAdded({ incomeSource: createdIncomeSource }));
        expect(state).toEqual(stateAfterNewIncomeSourceSubmitted.income);
    });

    it('returns the state with originally loaded income sources entity and indicates that ' 
        + 'submission of a new income source has been unsucessful', () => {
        const state = incomeSourcesReducer(stateWithLoadedIncomeSources.income, 
        new IncomeSourceAddedCancelled({ err: {error: {
            Error: "Error! Income Source Submission Failed!"
        } } }));
       expect(state).toEqual(stateAfterNewIncomeSourceSubmittedFailure.income);
    });


    it('returns the state with updated income sources entity and indicates that ' 
       + 'an income source has been sucessfully revised', () => {
        const state = incomeSourcesReducer(stateWithLoadedIncomeSources.income, 
            new IncomeSourceEditUpdated({ incomeSource: {id: 2, 
                changes: revisedIncomeSource }})
        );
        expect(state).toEqual(stateAfterIncomeSourceRevised.income);
    });

    it('returns the state with originally loaded income sourcess entity and indicates that ' 
       + 'the revision of the 2nd income source was not sucessful', () => {
        const state = incomeSourcesReducer(stateWithLoadedIncomeSources.income, 
            new IncomeSourceEditCancelled({ err: {error: {
                Error: "Error! Income Source Update Failed!"
            } } })
        );
        expect(state).toEqual(stateAfterIncomeSourceRevisedFailure.income);
    });

    it('returns the original state with one less income source entity and indicates that ' 
       + 'the third income source has been sucessfully deleted', () => {
        const state = incomeSourcesReducer(stateAfterNewIncomeSourceSubmitted.income, 
        new IncomeSourceDeletionSaved({ 
            id: 3, 
            message: stateAfterIncomeSourceDeletedSuccess.income.successMessage 
        }));
        expect(state).toEqual(stateAfterIncomeSourceDeletedSuccess.income);
    });

    it('returns the state after income sources entity has been added ' 
    + 'and indicates that the deletion of the third income source failed', () => {
        const state = incomeSourcesReducer(stateAfterNewIncomeSourceSubmitted.income, 
        new IncomeSourceDeletionCancelled({ 
            err: {
                error: {
                    Error: "Error! Income Source Deletion Failed!"
                }
            } 
        }));
        expect(state).toEqual(stateAfterIncomeSourceDeletedFailure.income);
    });
});