import { Dictionary } from "@ngrx/entity";

import { createdExpense, editedExpenseData, 
  expensesData } from "./expenses-data";
import { ExpenseModel } from "src/app/models/expense.model";

const ids:number[] = [ expensesData[0].id, expensesData[1].id ];
const idsAfterNewExpenseAdded:number[] = [ ...ids ];
idsAfterNewExpenseAdded.push(createdExpense.id);

const entities:Dictionary<ExpenseModel> = {
    '1': expensesData[0],
    '2': expensesData[1]
};

export const revisedExpense: ExpenseModel =  { 
    id: 2, expense_name: editedExpenseData.expense_name, 
    user: expensesData[1].user,
  }


const entitiesWithExpenseRevised: Dictionary<ExpenseModel> = { 
    '1': expensesData[0],
    '2': revisedExpense
  }

  const entitiesWithNewExpenseAdded: Dictionary<ExpenseModel> = { 
    ...entities, '3': createdExpense 
  }

const deletedExpenseFailureMessage: string = "Error! Expense Deletion Failed!";
const deletedExpenseSuccessMessage: string = 'You have successfully deleted an expense!';
const newExpenseFailureMessage: string = "Error! Expense Submission Failed!";
const newExpenseSuccessMessage: string = 'You have successfully submitted a new expense!';
const revisedExpenseFailureMessage: string = "Error! Expense Update Failed!";
const revisedExpenseSuccessMessage: string = 'You have successfully updated the expense info!';


export const stateAfterExpenseDeletedFailure = {
    expenses: {
      ids: idsAfterNewExpenseAdded,
      entities: entitiesWithNewExpenseAdded,
      errorMessage: deletedExpenseFailureMessage,
      expensesLoaded: true,
      successMessage: undefined
    }
  };
  
  export const stateAfterExpenseDeletedSuccess = {
    expenses: {
      ids: ids,
      entities: entities,
      errorMessage: undefined,
      expensesLoaded: true,
      successMessage: deletedExpenseSuccessMessage
    }
  };

  export const stateAfterExpenseRevised = {
    expenses: {
      ids: [2, 1],
      entities: entitiesWithExpenseRevised,
      errorMessage: undefined,
      expensesLoaded: true,
      successMessage: revisedExpenseSuccessMessage
    }
  };
  
  export const stateAfterExpenseRevisedFailure = {
    expenses: {
      ids: ids,
      entities: entities,
      errorMessage: revisedExpenseFailureMessage,
      expensesLoaded: true,
      successMessage: undefined
    }
  };
  
  export const stateAfterNewExpenseSubmitted = {
    expenses: {
      ids: idsAfterNewExpenseAdded,
      entities: entitiesWithNewExpenseAdded,
      errorMessage: undefined,
      expensesLoaded: true,
      successMessage: newExpenseSuccessMessage
    }
  };
  
  export const stateAfterNewExpenseSubmittedFailure = {
    expenses: {
      ids: ids,
      entities: entities,
      errorMessage: newExpenseFailureMessage,
      expensesLoaded: true,
      successMessage: undefined
    }
  };
  

export const stateWithLoadedExpenses = {
    expenses: {
      ids: ids,
      entities: entities,
      errorMessage: undefined,
      expensesLoaded: true,
      successMessage: undefined
    }
};
