import { Dictionary } from "@ngrx/entity";

import { 
    createdIncomeSource, editedIncomeSourceData, 
    incomeSourcesData } from "./income-sources-data";
import { IncomeSourceModel } from "src/app/models/income-source.model";

const ids:number[] = [ incomeSourcesData[0].id, incomeSourcesData[1].id ];
const idsAfterNewIncomeSourceAdded:number[] = [ ...ids ];
idsAfterNewIncomeSourceAdded.push(createdIncomeSource.id);

const entities:Dictionary<IncomeSourceModel> = {
    '1': incomeSourcesData[0],
    '2': incomeSourcesData[1]
};

export const revisedIncomeSource: IncomeSourceModel =  { 
    id: 2, income_source_name: editedIncomeSourceData.income_source_name, 
}

const entitiesWithIncomeSourceRevised: Dictionary<IncomeSourceModel> = { 
    '1': incomeSourcesData[0],
    '2': revisedIncomeSource
}

const entitiesWithNewIncomeSourceAdded: Dictionary<IncomeSourceModel> = { 
    ...entities, '3': createdIncomeSource 
}

const deletedIncomeSourceFailureMessage: string = "Error! Income Source Deletion Failed!";
const deletedIncomeSourceSuccessMessage: string = 'You have successfully deleted an income source!';
const newIncomeSourceFailureMessage: string = "Error! Income Source Submission Failed!";
const newIncomeSourceSuccessMessage: string = 'You have successfully submitted a new income source!';
const revisedIncomeSourceFailureMessage: string = "Error! Income Source Update Failed!";
const revisedIncomeSourceSuccessMessage: string = 'You have successfully updated the income source info!';

export const stateAfterIncomeSourceDeletedFailure = {
    income: {
      ids: idsAfterNewIncomeSourceAdded,
      entities: entitiesWithNewIncomeSourceAdded,
      errorMessage: deletedIncomeSourceFailureMessage,
      incomeSourcesLoaded: true,
      successMessage: undefined
    }
};

export const stateAfterIncomeSourceDeletedSuccess = {
    income: {
      ids: ids,
      entities: entities,
      errorMessage: undefined,
      incomeSourcesLoaded: true,
      successMessage: deletedIncomeSourceSuccessMessage
    }
  };

export const stateAfterIncomeSourceRevised = {
    income: {
      ids: [2, 1],
      entities: entitiesWithIncomeSourceRevised,
      errorMessage: undefined,
      incomeSourcesLoaded: true,
      successMessage: revisedIncomeSourceSuccessMessage
    }
};

export const stateAfterIncomeSourceRevisedFailure = {
    income: {
      ids: ids,
      entities: entities,
      errorMessage: revisedIncomeSourceFailureMessage,
      incomeSourcesLoaded: true,
      successMessage: undefined
    }
};

export const stateAfterNewIncomeSourceSubmitted = {
    income: {
      ids: idsAfterNewIncomeSourceAdded,
      entities: entitiesWithNewIncomeSourceAdded,
      errorMessage: undefined,
      incomeSourcesLoaded: true,
      successMessage: newIncomeSourceSuccessMessage
    }
};

export const stateAfterNewIncomeSourceSubmittedFailure = {
    income: {
      ids: ids,
      entities: entities,
      errorMessage: newIncomeSourceFailureMessage,
      incomeSourcesLoaded: true,
      successMessage: undefined
    }
};
  
export const stateWithLoadedIncomeSources = {
    income: {
        ids: ids,
        entities: entities,
        errorMessage: undefined,
        incomeSourcesLoaded: true,
        successMessage: undefined
    }
};
