import { Dictionary } from "@ngrx/entity";

import { createdSpendingRecord, spendingRecordsData } from "./spending-records-data";
import { 
  generateListOfThreeTestDates 
} from "src/app/shared-utils/date-helpers.util";
import { SpendingRecordModel } from "src/app/models/spending-record.model";

const threeDatesThisMonth: [string, string, string] = generateListOfThreeTestDates();
const dateRangeThisMonth: [string, string] = [threeDatesThisMonth[1], threeDatesThisMonth[2]]
const ids:number[] = [ spendingRecordsData[1].id, spendingRecordsData[0].id ];
const idsAfterNewExpenseAdded:number[] = [
  spendingRecordsData[1].id, spendingRecordsData[0].id, createdSpendingRecord.id, 
];

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
      dateRange: dateRangeThisMonth,
      entities: entitiesWithNewSpendingRecordAdded,
      errorMessage: deletedSpendingRecordFailureMessage,
      spendingRecordsLoaded: true,
      successMessage: undefined
    }
  };
  
export const stateAfterSpendingRecordDeletedSuccess = {
  spending: {
      ids: ids,
      dateRange: dateRangeThisMonth,
      entities: entities,
      errorMessage: undefined,
      spendingRecordsLoaded: true,
      successMessage: deletedSpendingRecordSuccessMessage
  }
};
    
export const stateAfterNewSpendingRecordSubmittedFailure = {
    spending: {
      ids: ids,
      entities: entities,
      dateRange: dateRangeThisMonth,
      errorMessage: newSpendingRecordFailureMessage,
      spendingRecordsLoaded: true,
      successMessage: undefined
    }
};

export const stateAfterNewSpendingRecordSubmittedInDateRange = {
  spending: {
    ids: idsAfterNewExpenseAdded,
    dateRange: dateRangeThisMonth,
    entities: entitiesWithNewSpendingRecordAdded,
    errorMessage: undefined,
    spendingRecordsLoaded: true,
    successMessage: newSpendingRecordSuccessMessage
  }
};


export const stateAfterNewSpendingRecordSubmittedOutOfDateRange = {
  spending: {
    ids: ids,
    dateRange: dateRangeThisMonth,
    entities: entities,
    errorMessage: undefined,
    spendingRecordsLoaded: true,
    successMessage: newSpendingRecordSuccessMessage
  }
};


export const stateAfterSpendingRecordsRequestAwaitingLoading = {
  spending: {
    ids: [],
    dateRange: dateRangeThisMonth,
    entities: entities,
    errorMessage: undefined,
    spendingRecordsLoaded: false,
    successMessage: undefined
  }
};

    
export const stateWithSpendingRecordsLoaded = {
    spending: {
      ids: ids,
      dateRange: dateRangeThisMonth,
      entities: entities,
      errorMessage: undefined,
      spendingRecordsLoaded: true,
      successMessage: undefined
    }
};
  
