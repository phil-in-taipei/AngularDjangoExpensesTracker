import { Dictionary } from "@ngrx/entity";

import { banksData } from "./banks-data";
import { BankModel } from "src/app/models/bank.model";

const ids:number[] = [ banksData[0].id, banksData[1].id ];

const entities:Dictionary<BankModel> = {
    '1': banksData[0],
    '2': banksData[1]
};

export const stateWithLoadedBanks = {
    banks: {
      ids: ids,
      entities: entities,
      banksLoaded: true
    }
};
