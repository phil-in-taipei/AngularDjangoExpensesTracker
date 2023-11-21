import { Action} from "@ngrx/store";
import { Update } from "@ngrx/entity";

import {
    SavingsAccountCreateModel,
    SavingsAccountEditModel,
    SavingsAccountModel
} from "src/app/models/savings-account.model";

export enum SavingsAccountsActionTypes {
    SavingsAccountsRequested = '[View Finance Component Base Page] Savings Accounts Requested',
    SavingsAccountsLoaded = '[Savings Accounts API] All Savings Accounts Loaded',
    SavingsAccountSubmitted = '[Create Savings Account Page] Savings Account Submitted',
    SavingsAccountAdded = '[Savings Accounts Page] Savings Account Added',
    SavingsAccountAddedCancelled = '[Create Savings Account Page] Savings Account Added Cancelled',
    SavingsAccountDeletionCancelled = '[Savings Accounts Page] Removal of Savings Account Cancelled',
    SavingsAccountDeletionRequested = '[Savings Accounts Page]  Removal of Savings Account Requested',
    SavingsAccountDeletionSaved = '[Savings Accounts Page] Savings Account Removed',
    SavingsAccountEditCancelled= '[Edit Savings Account Page] Edit Savings Account Cancelled',
    SavingsAccountEditSubmitted = '[Edit Savings Account Page] Edited Savings Account Submitted',
    SavingsAccountEditUpdated = '[Savings Accounts Page] Edited Savings Account Updated',
    SavingsAccountDepositSubmitted = '[Create Deposit Page] Updated Savings Account Balance Submitted',
    SavingsAccountDepositSaved = '[Create Deposit Page] Savings Account Balance Updated Following Deposit',
    SavingsAccountDepositDeletionSaved = '[Deposits List Page] Savings Account Balance Updated Following Deletion of Deposit',
    SavingsAccountWithdrawalSaved = '[Create Withdrawal Page] Savings Account Balance Updated Following Withdrawal',
    SavingsAccountWithdrawalDeletionSaved = '[Withdrawals List Page] Savings Account Balance Updated Following Deletion of Withdrawal',
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

export class SavingsAccountDeletionCancelled implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountDeletionCancelled;

    constructor(public payload: {  err: any }) {

    }
}

export class SavingsAccountDeletionRequested implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountDeletionRequested;

    constructor(public payload: { id: number }) {}
}

export class SavingsAccountDeletionSaved implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountDeletionSaved;

    constructor(public payload: { id: number, message: string }) {}
}

export class SavingsAccountDepositSubmitted implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountDepositSubmitted;

    constructor(public payload: { id: number, amount: number }) {}
}

export class SavingsAccountDepositSaved implements Action {
  readonly type = SavingsAccountsActionTypes.SavingsAccountDepositSaved;

  constructor(public payload: { amount: string; savingsAccount: SavingsAccountModel}) {}
}

export class SavingsAccountDepositDeletionSaved implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountDepositDeletionSaved;
  
    constructor(public payload: { amount: number; savingsAccount: SavingsAccountModel}) {}
  }

export class SavingsAccountWithdrawalSaved implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountWithdrawalSaved;
  
    constructor(public payload: { amount: string; savingsAccount: SavingsAccountModel}) {}
}
  
export class SavingsAccountWithdrawalDeletionSaved implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountWithdrawalDeletionSaved;
    
    constructor(public payload: { amount: number; savingsAccount: SavingsAccountModel}) {}
}

export class SavingsAccountEditCancelled implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountEditCancelled;

    constructor(public payload: {  err: any }) {

    }
}

export class SavingsAccountEditSubmitted implements Action {

    readonly type = SavingsAccountsActionTypes.SavingsAccountEditSubmitted;

    constructor(public payload:
        {  id: number, savingsAccount: SavingsAccountEditModel }) {}
}

export class SavingsAccountEditUpdated implements Action {
    readonly type = SavingsAccountsActionTypes.SavingsAccountEditUpdated;

    constructor(public payload: {  savingsAccount: Update<SavingsAccountModel> }) {
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
    SavingsAccountEditCancelled | SavingsAccountEditSubmitted |
    SavingsAccountEditUpdated | SavingsAccountDeletionCancelled |
    SavingsAccountDeletionRequested | SavingsAccountDeletionSaved |
    SavingsAccountDepositSubmitted | SavingsAccountDepositSaved |
    SavingsAccountDepositDeletionSaved | SavingsAccountWithdrawalSaved |
    SavingsAccountWithdrawalDeletionSaved |
    SavingsAccountAddedCancelled | SavingsAccountsCleared |
    SavingsAccountsLoaded | SavingsAccountMessagesCleared |
    SavingsAccountsRequested | SavingsAccountSubmitted;
