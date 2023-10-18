import { Action} from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { 
    IncomeSourceModel, IncomeSourceCreateAndEditModel 
} from "src/app/models/income-source.model";

export enum IncomeSourcesActionTypes {
    IncomeSourcesRequested = '[View Finance Component Base Page] Income Sources Requested',
    IncomeSourcesLoaded = '[Income Sources API] All Income Sources Loaded',
    IncomeSourceSubmitted = '[Create Income Source Page] Income Source Submitted',
    IncomeSourceAdded = '[Income Sources Page] Income Source Added',
    IncomeSourceAddedCancelled = '[Create Income Source Page] Income Source Added Cancelled',
    IncomeSourceDeletionCancelled = '[Income Source Page] Removal of Income Source Cancelled',
    IncomeSourceDeletionRequested = '[Income Source Page]  Removal of Income Source Requested',
    IncomeSourceDeletionSaved = '[Income Sources Page] Income Source Removed',
    IncomeSourceEditCancelled= '[Edit Income Source Page] Edit Income Source Cancelled',
    IncomeSourceEditSubmitted = '[Edit Income Source Page] Edited Income Source Submitted',
    IncomeSourceEditUpdated = '[Income Sources Page] Edited Income Source Updated',
    IncomeSourcesCleared = '[View User Logout] Income Sources Removed',
    IncomeSourcesMessagesCleared = '[Create Income Sources Page] Income Sources Messages Cleared',
};

export class IncomeSourceAdded implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourceAdded;
  
    constructor(public payload: 
        {  incomeSource: IncomeSourceModel }) {}
}

export class IncomeSourceAddedCancelled implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourceAddedCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class IncomeSourceDeletionCancelled implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourceDeletionCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class IncomeSourceDeletionRequested implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourceDeletionRequested;
  
    constructor(public payload: { id: number }) {}
}

export class IncomeSourceDeletionSaved implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourceDeletionSaved;
  
    constructor(public payload: { id: number, message: string }) {}
}

export class IncomeSourceEditCancelled implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourceEditCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class IncomeSourceEditSubmitted implements Action {

    readonly type = IncomeSourcesActionTypes.IncomeSourceEditSubmitted;
  
    constructor(public payload: 
        {  id: number, incomeSource: IncomeSourceCreateAndEditModel }) {}
}

export class IncomeSourceEditUpdated implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourceEditUpdated;
  
    constructor(public payload: {  incomeSource: Update<IncomeSourceModel> }) {
    }
}

export class IncomeSourcesCleared implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourcesCleared;
}

export class IncomeSourcesLoaded implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourcesLoaded;
  
    constructor(
        public payload: { incomeSources: IncomeSourceModel[] }
        ) {}
}

export class IncomeSourceMessagesCleared implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourcesMessagesCleared;
}

export class IncomeSourcesRequested implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourcesRequested;
}

export class IncomeSourceSubmitted implements Action {
    readonly type = IncomeSourcesActionTypes.IncomeSourceSubmitted;
  
    constructor(
        public payload: { incomeSource: IncomeSourceCreateAndEditModel }
        ){}
  }

export type IncomeSourceActions =  IncomeSourceAdded | 
    IncomeSourceEditCancelled | IncomeSourceEditSubmitted |
    IncomeSourceEditUpdated | IncomeSourceDeletionCancelled |
    IncomeSourceDeletionRequested | IncomeSourceDeletionSaved |
    IncomeSourceAddedCancelled | IncomeSourcesCleared |
    IncomeSourcesLoaded | IncomeSourceMessagesCleared |
    IncomeSourcesRequested | IncomeSourceSubmitted;