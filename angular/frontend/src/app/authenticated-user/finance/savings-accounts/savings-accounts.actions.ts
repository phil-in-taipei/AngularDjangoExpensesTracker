import { Action} from "@ngrx/store";

import { SavingsAccountCreateModel, 
    SavingsAccountEditModel,
    SavingsAccountModel } from "src/app/models/savings-account.model";

export enum SavingsAccountsActionTypes {
    SavingsAccountsRequested = '[View Finance Component Base Page] Savings Accounts Requested',
    SavingsAccountsLoaded = '[Savings Accounts API] All Savings Accounts Loaded',
    SavingsAccountSubmitted = '[Create Savings Account Page] Savings Account Submitted',
    SavingsAccountAdded = '[Savings Accounts Page] Savings Account Added',
    SavingsAccountAddedCancelled = '[Create Savings Account Page] Savings Account Added Cancelled',
    //SavingsAccontEditSubmitted = '[Edit Savings Account Page] Edited Savings Account Submitted',
    //SavingsAccountEditAdded = '[Savings Accounts Page] Edited Savings Account Added',
    //SavingsAccountRemoveRequested = '[Savings Accounts Page]  Removal of Savings Account Requested',
    //SavingsAccountsRemoved = '[Savings Accounts Page] Savings Account Removed',
    SavingsAccountsCleared = '[View User Logout] Savings Accounts Removed',
    SavingsAccountsMessagesCleared = '[Create Savings Accounts Page] Savings Accounts Messages Cleared',
};

export class SavingsAccountAdded implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountAdded;
  
    constructor(public payload: 
        {  savingsAccount: SavingsAccountModel }) {}
}

export class SavingsAccountAddedCancelled implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountAddedCancelled;
  
    constructor(public payload: {  err: any }) {
  
    }
}

export class SavingsAccountsCleared implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountsCleared;
}

export class SavingsAccountsLoaded implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountsLoaded;
  
    constructor(
        public payload: { savingsAccounts: SavingsAccountModel[] }
        ) {}
}

export class SavingsAccountMessagesCleared implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountsMessagesCleared;
  }

export class SavingsAccountsRequested implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountsRequested;
}

export class SavingsAccountSubmitted implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountSubmitted;
  
    constructor(
        public payload: { savingsAccount: SavingsAccountCreateModel }
        ){}
  }

export type SavingsAccountActions =  SavingsAccountAdded | 
    SavingsAccountAddedCancelled | SavingsAccountsCleared |
    SavingsAccountsLoaded | SavingsAccountMessagesCleared |
    SavingsAccountsRequested | SavingsAccountSubmitted;

    
