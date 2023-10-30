import { Dictionary } from "@ngrx/entity";

import { createdSpendingRecord, spendingRecordsData } from "./spending-records-data";
import { SpendingRecordModel } from "src/app/models/spending-record.model";

const ids:number[] = [ spendingRecordsData[0].id, spendingRecordsData[1].id ];
const idsAfterNewExpenseAdded:number[] = [ ...ids ];
idsAfterNewExpenseAdded.push(createdSpendingRecord.id);

const entities:Dictionary<SpendingRecordModel> = {
    '1': spendingRecordsData[0],
    '2': spendingRecordsData[1]
};

const entitiesWithNewSpendingRecordAdded: Dictionary<SpendingRecordModel> = { 
    ...entities, '3': createdSpendingRecord 
  }

const deletedSpendingRecordFailureMessage: string = "Error! Spending Record Deletion Failed!";
const deletedSpendingRecordSuccessMessage: string = 'You have successfully deleted a spending record!';
const newSpendingRecordFailureMessage: string = "Error! Spending Record Submission Failed!";
const newSpendingRecordSuccessMessage: string = 'You have successfully submitted a new spending record!';

export const stateAfterSpendingRecordDeletedFailure = {
    spending: {
      ids: idsAfterNewExpenseAdded,
      entities: entitiesWithNewSpendingRecordAdded,
      errorMessage: deletedSpendingRecordFailureMessage,
      spendingRecordsLoaded: true,
      successMessage: undefined
    }
  };
  
  export const stateAfterSpendinngRecordDeletedSuccess = {
    spending: {
      ids: ids,
      entities: entities,
      errorMessage: undefined,
      spendingRecordsLoaded: true,
      successMessage: deletedSpendingRecordSuccessMessage
    }
  };

export const stateAfterNewSpendingRecordSubmitted = {
    spending: {
      ids: idsAfterNewExpenseAdded,
      entities: entitiesWithNewSpendingRecordAdded,
      errorMessage: undefined,
      spendingRecordsLoaded: true,
      successMessage: newSpendingRecordSuccessMessage
    }
};
    
export const stateAfterNewSpendingRecordSubmittedFailure = {
    spending: {
      ids: ids,
      entities: entities,
      errorMessage: newSpendingRecordFailureMessage,
      spendingRecordsLoaded: true,
      successMessage: undefined
    }
};
    
export const stateWithLoadedSpendingRecords = {
    spending: {
      ids: ids,
      entities: entities,
      errorMessage: undefined,
      spendingRecordsLoaded: true,
      successMessage: undefined
    }
};
  
