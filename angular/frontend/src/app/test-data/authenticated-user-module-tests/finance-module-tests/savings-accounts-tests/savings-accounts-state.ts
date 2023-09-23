import { Dictionary } from "@ngrx/entity";

import { savingsAccountsData } from "./savings-accounts-data";
import { SavingsAccountModel } from "src/app/models/savings-account.model";

const ids:number[] = [ savingsAccountsData[0].id, savingsAccountsData[1].id ];


const entities:Dictionary<SavingsAccountModel> = {
    '1': savingsAccountsData[0],
    '2': savingsAccountsData[1]
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