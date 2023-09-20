import { Action} from "@ngrx/store";

import { BankModel } from "src/app/models/bank.model";

export enum BanksActionTypes {
    BanksRequested = '[View Authenticated User Page] Currencies Requested',
    BanksLoaded = '[Banks API] All Banks Loaded',
    BanksCleared = '[View User Logout] Banks Removed',
}


export class BanksCleared implements Action {
    readonly type = BanksActionTypes.BanksCleared;
}

export class BanksLoaded implements Action {
    readonly type = BanksActionTypes.BanksLoaded;
  
    constructor(
        public payload: { banks: BankModel[] }
        ) {}
}

export class BanksRequested implements Action {
    readonly type = BanksActionTypes.BanksRequested;
}

export type BanksActions = BanksCleared |
    BanksLoaded | BanksRequested;