import { Action} from "@ngrx/store";

import { 
    SpendingRecordCreateModel, SpendingRecordModel 
} from "src/app/models/spending-record.model";

export enum SpendingRecordsActionTypes {
    SpendingRecordsRequested = '[Spending Component Base Page] Monthly Spending Records Requested',
    SpendingRecordsLoaded = '[Spending Records API] Monthly Spending Records Loaded',
    SpendingRecordSubmitted = '[Create Spending Record Page] Spending Record Submitted',
    SpendingRecordAdded = '[Spending Records Page] Spending Record Added',
    SpendingRecordAddedCancelled = '[Create Spending Record Page] Spending Record Added Cancelled',
    SpendingRecordDeletionCancelled = '[Spending Records Page] Removal of Spending Record Cancelled',
    SpendingRecordDeletionRequested = '[Spending Records Page]  Removal of Spending Record Requested',
    SpendingRecordDeletionSaved = '[Spending Records Page] Spending Record Removed',
    SpendingRecordsCleared = '[AuthService User Logout] Spending Records Removed',
    SpendingRecordsMessagesCleared = '[Spending Records, Edit, and Submission Pages] Spending Records Messages Cleared',
};

export class SpendingRecordAdded implements Action {
    readonly type = SpendingRecordsActionTypes.SpendingRecordAdded;
  
    constructor(public payload: 
        {  spendingRecord: SpendingRecordModel }) {}
}

export class SpendingRecordAddedCancelled implements Action {
    readonly type = SpendingRecordsActionTypes.SpendingRecordAddedCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class SpendingRecordDeletionCancelled implements Action {
    readonly type = SpendingRecordsActionTypes.SpendingRecordDeletionCancelled;
  
    constructor(public payload: {  err: any }) {
  
    }
}

export class SpendingRecordDeletionRequested implements Action {
    readonly type = SpendingRecordsActionTypes.SpendingRecordDeletionRequested;
  
    constructor(public payload: { id: number }) {}
}

export class SpendingRecordDeletionSaved implements Action {
    readonly type = SpendingRecordsActionTypes.SpendingRecordDeletionSaved;
  
    constructor(public payload: { id: number, message: string }) {}
}

export class SpendingRecordsCleared implements Action {
    readonly type = SpendingRecordsActionTypes.SpendingRecordsCleared;
}

export class SpendingRecordsLoaded implements Action {
    readonly type = SpendingRecordsActionTypes.SpendingRecordsLoaded;
  
    constructor(
        public payload: { spendingRecords: SpendingRecordModel[] }
    ) {}
}

export class SpendingRecordsMessagesCleared implements Action {
    readonly type = SpendingRecordsActionTypes.SpendingRecordsMessagesCleared;
}

export class SpendingRecordsRequested implements Action {
    readonly type = SpendingRecordsActionTypes.SpendingRecordsRequested;
}

export class SpendingRecordSubmitted implements Action {
    readonly type = SpendingRecordsActionTypes.SpendingRecordSubmitted;
  
    constructor(
        public payload: { spendingRecord: SpendingRecordCreateModel }
        ){}
}

export type SpendingRecordsActions =  SpendingRecordAdded | 
    SpendingRecordDeletionCancelled | SpendingRecordDeletionRequested | 
    SpendingRecordDeletionSaved |
    SpendingRecordAddedCancelled | SpendingRecordsCleared |
    SpendingRecordsLoaded | SpendingRecordsMessagesCleared |
    SpendingRecordsRequested | SpendingRecordSubmitted;
 