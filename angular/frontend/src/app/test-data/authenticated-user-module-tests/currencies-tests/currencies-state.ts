import { Dictionary } from "@ngrx/entity";

import { currenciesData } from "./currencies-data";
import { CurrencyModel } from "src/app/models/currency.model";



const ids:number[] = [ currenciesData[0].id, currenciesData[1].id ];

const entities:Dictionary<CurrencyModel> = {
    '1': currenciesData[0],
    '2': currenciesData[1]
};

export const stateWithLoadedCurrencies = {
    currencies: {
      ids: ids,
      entities: entities,
      currenciesLoaded: true
    }
};
