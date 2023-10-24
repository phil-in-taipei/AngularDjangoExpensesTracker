import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import { SpendingRecordModel } from 'src/app/models/spending-record.model';
import { 
    SpendingRecordsActions, SpendingRecordsActionTypes 
} from './spending-records.actions';


function compareSpendingRecordsByDate(
    a:SpendingRecordModel, b:SpendingRecordModel) {
    const sRA = a.date;
    const sRB = b.date;
  
    let comparison = 0;
    if (sRA > sRB) {
      comparison = 1;
    } else if (sRA < sRB) {
      comparison = -1;
    }
    return comparison;
};

export interface SpendingRecordsState extends EntityState<SpendingRecordModel> {
    errorMessage: string | undefined,
    spendingRecordsLoaded:boolean;
    successMessage: string | undefined,
};

export const adapter: EntityAdapter<SpendingRecordModel> = 
    createEntityAdapter<SpendingRecordModel>(
        { sortComparer: compareSpendingRecordsByDate }
    );

export const initialSpendingRecordsState: SpendingRecordsState = adapter.getInitialState({
     errorMessage: undefined,
     spendingRecordsLoaded: false,
    successMessage: undefined
});



export function spendingRecordsReducer(
    state = initialSpendingRecordsState,
    action: SpendingRecordsActions): SpendingRecordsState {


    switch(action.type) {

        case SpendingRecordsActionTypes.SpendingRecordAdded:
            return adapter.addOne(action.payload.spendingRecord, 
                { ...state,
                  errorMessage: undefined,
                  successMessage: 'You have successfully submitted a new spending record!'
                }
            );

        case SpendingRecordsActionTypes.SpendingRecordAddedCancelled:
            let errorMessage: string = "Error! Spending Record Submission Failed!";
            if (action.payload.err.error.Error) {
                errorMessage = action.payload.err.error.Error;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: errorMessage
            }

        case SpendingRecordsActionTypes.SpendingRecordDeletionCancelled:
            let errMsg: string = "Error! Spending Record Deletion Failed!";
            if (action.payload.err.error.Error) {
                errMsg = action.payload.err.error.Error;
            }
            return {
                    ...state,  successMessage: undefined,
                    errorMessage: errMsg
            }

        case SpendingRecordsActionTypes.SpendingRecordDeletionSaved:
            return adapter.removeOne(action.payload.id, 
                { ...state,
                  errorMessage: undefined,
                  successMessage: action.payload.message
                }
            );

        case SpendingRecordsActionTypes.SpendingRecordsMessagesCleared:
            return {...state,  successMessage: undefined,
               errorMessage: undefined
            }

        case SpendingRecordsActionTypes.SpendingRecordsCleared:
            return initialSpendingRecordsState;

        case SpendingRecordsActionTypes.SpendingRecordsLoaded:
            return adapter.setAll(action.payload.spendingRecords, 
                {...state, spendingRecordsLoaded:true});

        default: {
            return state;
        }
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
  } = adapter.getSelectors();

    
