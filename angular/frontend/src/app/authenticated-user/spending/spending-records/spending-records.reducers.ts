import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import { 
  getFirstDateofMonthStr, getLastDateofMonthStr 
} from 'src/app/shared-utils/date-helpers.util';
import { SpendingRecordModel } from 'src/app/models/spending-record.model';
import { 
    SpendingRecordsActions, SpendingRecordsActionTypes 
} from './spending-records.actions';


export function compareSpendingRecordsByDate(
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
    dateRange: [string, string] | undefined;
    errorMessage: string | undefined,
    spendingRecordsLoaded:boolean;
    successMessage: string | undefined,
};

export const adapter: EntityAdapter<SpendingRecordModel> = 
    createEntityAdapter<SpendingRecordModel>(
        { sortComparer: compareSpendingRecordsByDate }
    );

export const initialSpendingRecordsState: SpendingRecordsState = 
    adapter.getInitialState({
        dateRange: undefined,
        errorMessage: undefined,
        spendingRecordsLoaded: false,
        successMessage: undefined
});



export function spendingRecordsReducer(
    state = initialSpendingRecordsState,
    action: SpendingRecordsActions): SpendingRecordsState {


    switch(action.type) {

        case SpendingRecordsActionTypes.SpendingRecordAdded:
            // checks if Spending Records have already been loaded into state for a given
            // month. If dateRange is undefined, it means the state is empty
            if (state.dateRange) {
                // checks if the newly submitted spending record is within the date range of the
                // month of spending records currently in state. If so, it adds the new object to 
                // the state
                console.log('this is the new spending record in the reducer function:')
                console.log(action.payload.spendingRecord);
                console.log('this is the first date in the date range:')
                console.log(state.dateRange[0]);
                console.log('this is the last date in the date range:')
                console.log(state.dateRange[1]);
                if(action.payload.spendingRecord.date >= state.dateRange[0] 
                    && action.payload.spendingRecord.date < state.dateRange[1]) {
                        return adapter.addOne(action.payload.spendingRecord, 
                            { ...state,
                              errorMessage: undefined,
                              successMessage: 'You have successfully submitted a new spending record!'
                            }
                        );
                } else {
                    // if the newly created Spending Record is not within the date range of the 
                    // month of spending records in state, it is not added, but there is still
                    // a confirmation success message
                    return { ...state,
                        errorMessage: undefined,
                        successMessage: 'You have successfully submitted a new spending record!'
                      }
                }

            } else {
                // If no spending records are in state (signified by dateRange undefined value), 
                //it is not added, but there is still a confirmation success message
                return { ...state,
                    errorMessage: undefined,
                    successMessage: 'You have successfully submitted a new spending record!'
                  }
            }
                
            

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

        case SpendingRecordsActionTypes.SpendingRecordsRequested:
            let month:number = +action.payload.month;
            let year:number = +action.payload.year;
            let firstDate = getFirstDateofMonthStr(month, year);
            let lastDate = getLastDateofMonthStr(month, year);
            return {
                 ...state,  dateRange: [firstDate, lastDate],
                  spendingRecordsLoaded:false 
            }

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

    
