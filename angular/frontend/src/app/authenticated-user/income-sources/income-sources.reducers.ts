import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import { IncomeSourceModel } from 'src/app/models/income-source.model';
import { 
    IncomeSourceActions, IncomeSourcesActionTypes 
} from './income-sources.actions';

// sort the income sources alphabetically by name
function compareIncomeSourcesByName(
    a:IncomeSourceModel, b:IncomeSourceModel) {
    const incomeSourceA = a.income_source_name;
    const incomeSourceB = b.income_source_name;
  
    let comparison = 0;
    if (incomeSourceA > incomeSourceB) {
      comparison = 1;
    } else if (incomeSourceA < incomeSourceB) {
      comparison = -1;
    }
    return comparison;
};

export interface IncomeSourcesState extends EntityState<IncomeSourceModel> {
    errorMessage: string | undefined,
    incomeSourcesLoaded:boolean;
    successMessage: string | undefined,
};

export const adapter: EntityAdapter<IncomeSourceModel> = 
    createEntityAdapter<IncomeSourceModel>(
        { sortComparer: compareIncomeSourcesByName }
    );

export const initialIncomeSourcesState: IncomeSourcesState = adapter.getInitialState({
    errorMessage: undefined,
    incomeSourcesLoaded: false,
    successMessage: undefined
});

export function incomeSourcesReducer(
    state = initialIncomeSourcesState,
    action: IncomeSourceActions): IncomeSourcesState {
    
    switch(action.type) {

        case IncomeSourcesActionTypes.IncomeSourceAdded:
            return adapter.addOne(action.payload.incomeSource, 
                { ...state,
                  errorMessage: undefined,
                  successMessage: 'You have successfully submitted a new income source!'
                }
            );
        case IncomeSourcesActionTypes.IncomeSourceAddedCancelled:
            let errorMessage: string = "Error! Income Source Submission Failed!";
            if (action.payload.err.error.Error) {
                errorMessage = action.payload.err.error.Error;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: errorMessage
            }

        case IncomeSourcesActionTypes.IncomeSourceDeletionCancelled:
            let errMsg: string = "Error! Income Source Deletion Failed!";
            if (action.payload.err.error.Error) {
                errMsg = action.payload.err.error.Error;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: errMsg
            }

        case IncomeSourcesActionTypes.IncomeSourceDeletionSaved:
            return adapter.removeOne(action.payload.id, 
                { 
                    ...state,
                    errorMessage: undefined,
                    successMessage: action.payload.message
                }
            );

        case IncomeSourcesActionTypes.IncomeSourceEditCancelled:
            let editErrMessage: string = "Error! Income Source Update Failed!";
            if (action.payload.err.error.Error) {
                console.log(action.payload.err.error.Error)
                editErrMessage = action.payload.err.error.Error;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: editErrMessage
            }

        case IncomeSourcesActionTypes.IncomeSourceEditUpdated:
            return adapter.updateOne(action.payload.incomeSource, 
                {
                    ...state,
                    errorMessage:undefined,
                    successMessage: 'You have successfully updated the income source info!'
                }
            );
    
        case IncomeSourcesActionTypes.IncomeSourcesCleared:
            return initialIncomeSourcesState;

        case IncomeSourcesActionTypes.IncomeSourcesLoaded:
            return adapter.setAll(action.payload.incomeSources, 
                {...state, incomeSourcesLoaded:true });
    
        case IncomeSourcesActionTypes.IncomeSourcesMessagesCleared:
            return {
                ...state,  successMessage: undefined,
                errorMessage: undefined
            }

        default: {
            return state
        }
    }
};

export const {
    selectAll,
    selectEntities,
    selectIds,
  } = adapter.getSelectors();