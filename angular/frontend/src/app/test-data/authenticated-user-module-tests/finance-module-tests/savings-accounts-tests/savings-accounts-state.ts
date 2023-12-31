import { Dictionary } from "@ngrx/entity";

import { createdSavingsAccount, editedSavingsAccountData, 
  savingsAccountsData } from "./savings-accounts-data";
import { SavingsAccountModel } from "src/app/models/savings-account.model";

const ids:number[] = [ savingsAccountsData[0].id, savingsAccountsData[1].id ];
const idsAfterNewAccountAdded:number[] = [ ...ids ];
idsAfterNewAccountAdded.unshift(createdSavingsAccount.id);



const entities:Dictionary<SavingsAccountModel> = {
    '1': savingsAccountsData[0],
    '2': savingsAccountsData[1]
};

export const revisedSavingsAccount: SavingsAccountModel =  { 
  id: 2, account_name: editedSavingsAccountData.account_name, 
  account_balance: editedSavingsAccountData.account_balance,
  account_owner: savingsAccountsData[1].account_owner,
  currency: savingsAccountsData[1].currency,
  bank: savingsAccountsData[1].bank 
}

export const revisedSavingsAccountAfterDeposit: SavingsAccountModel =  { 
  id: 2, account_name: savingsAccountsData[1].account_name, 
  account_balance: editedSavingsAccountData.account_balance,
  account_owner: savingsAccountsData[1].account_owner,
  currency: savingsAccountsData[1].currency,
  bank: savingsAccountsData[1].bank 
}

// this is basically the original data with another name for clarity
export const revisedSavingsAccountAfterWithdrawal: SavingsAccountModel =  { 
  id: 2, account_name: savingsAccountsData[1].account_name, 
  account_balance: savingsAccountsData[1].account_balance,
  account_owner: savingsAccountsData[1].account_owner,
  currency: savingsAccountsData[1].currency,
  bank: savingsAccountsData[1].bank 
}

const entitiesWithAccountRevised: Dictionary<SavingsAccountModel> = { 
  '1': savingsAccountsData[0],
  '2': revisedSavingsAccount
}

const entitiesWithAccountRevisedFollowingDeposit: Dictionary<SavingsAccountModel> = { 
  '1': savingsAccountsData[0],
  '2': revisedSavingsAccountAfterDeposit
}

const entitiesWithAccountRevisedFollowingWithdrawal: Dictionary<SavingsAccountModel> = { 
  '1': savingsAccountsData[0],
  '2': revisedSavingsAccountAfterWithdrawal
}

const entitiesWithNewAccountAdded: Dictionary<SavingsAccountModel> = { 
  ...entities, '3': createdSavingsAccount 
}

const deletedAccountFailureMessage: string = "Error! Savings Account Deletion Failed!";
const deletedAccountSuccessMessage: string = 'You have successfully deleted an account!';
const newAccountFailureMessage: string = "Error! Savings Account Submission Failed!";
const newAccountSuccessMessage: string = 'You have successfully submitted a new account!';
const revisedAccountFailureMessage: string = "Error! Savings Account Update Failed!";
const revisedAccountSuccessMessage: string = 'You have successfully updated the account info!';

export const stateAfterAccountDeletedFailure = {
  accounts: {
    ids: idsAfterNewAccountAdded,
    entities: entitiesWithNewAccountAdded,
    errorMessage: deletedAccountFailureMessage,
    savingsAccountsLoaded: true,
    successMessage: undefined
  }
};

export const stateAfterAccountDeletedSuccess = {
  accounts: {
    ids: ids,
    entities: entities,
    errorMessage: undefined,
    savingsAccountsLoaded: true,
    successMessage: deletedAccountSuccessMessage
  }
};

export const stateAfterAccountRevised = {
  accounts: {
    ids: [2, 1],
    entities: entitiesWithAccountRevised,
    errorMessage: undefined,
    savingsAccountsLoaded: true,
    successMessage: revisedAccountSuccessMessage
  }
};

export const stateAfterAccountRevisedDueToDeposit = {
  accounts: {
    ids: [2, 1],
    entities: entitiesWithAccountRevisedFollowingDeposit,
    errorMessage: undefined,
    savingsAccountsLoaded: true,
    successMessage: revisedAccountSuccessMessage
  }
};

export const stateAfterAccountRevisedDueToDepositDeletion = {
  accounts: {
    ids: [2, 1],
    entities: entities,
    errorMessage: undefined,
    savingsAccountsLoaded: true,
    successMessage: revisedAccountSuccessMessage
  }
};

export const stateAfterAccountRevisedDueToWithdrawal = {
  accounts: {
    ids: [2, 1],
    entities: entitiesWithAccountRevisedFollowingWithdrawal,
    errorMessage: undefined,
    savingsAccountsLoaded: true,
    successMessage: revisedAccountSuccessMessage
  }
};

export const stateAfterAccountRevisedFailure = {
  accounts: {
    ids: ids,
    entities: entities,
    errorMessage: revisedAccountFailureMessage,
    savingsAccountsLoaded: true,
    successMessage: undefined
  }
};

export const stateAfterNewAccountSubmitted = {
  accounts: {
    ids: idsAfterNewAccountAdded,
    entities: entitiesWithNewAccountAdded,
    errorMessage: undefined,
    savingsAccountsLoaded: true,
    successMessage: newAccountSuccessMessage
  }
};

export const stateAfterNewAccountSubmittedFailure = {
  accounts: {
    ids: ids,
    entities: entities,
    errorMessage: newAccountFailureMessage,
    savingsAccountsLoaded: true,
    successMessage: undefined
  }
};

export const stateWithLoadedSavingsAccounts = {
    accounts: {
      ids: ids,
      entities: entities,
      errorMessage: undefined,
      savingsAccountsLoaded: true,
      successMessage: undefined
    }
};


