import {createEntityAdapter, EntityAdapter, 
    EntityState} from '@ngrx/entity';

import { CurrenciesActions, 
    CurrenciesActionTypes } from './currencies.actions';
import { CurrencyModel } from 'src/app/models/currency.model';


export interface CurrenciesState extends EntityState<CurrencyModel> {
    currenciesLoaded:boolean;
};

export const adapter: EntityAdapter<CurrencyModel> = createEntityAdapter<CurrencyModel>();

export const initialCurrenciesState: CurrenciesState = adapter.getInitialState({
    currenciesLoaded: false
});

export function currenciesReducer(state = initialCurrenciesState ,
    action: CurrenciesActions): CurrenciesState {
  
    switch(action.type) {

        case CurrenciesActionTypes.CurrenciesLoaded:
            return adapter.setAll(
                action.payload.currencies, 
                { ...state, currenciesLoaded:true }
            );
  
        case CurrenciesActionTypes.CurrenciesCleared:
            return initialCurrenciesState; //adapter.removeAll(state)
    
        default: {
            return state;
        }

    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
  } = adapter.getSelectors();
  