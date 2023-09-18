import {createEntityAdapter, EntityAdapter, 
    EntityState} from '@ngrx/entity';

import { BanksActions, BanksActionTypes } from './banks.actions';
import { BankModel } from 'src/app/models/bank.model';

export interface BanksState extends EntityState<BankModel> {
    banksLoaded:boolean;
};

export const adapter: EntityAdapter<BankModel> = createEntityAdapter<BankModel>();

export const initialBanksState: BanksState = adapter.getInitialState({
    banksLoaded: false
});

export function banksReducer(state = initialBanksState,
    action: BanksActions): BanksState {

    switch(action.type) {

        case(BanksActionTypes.BanksLoaded):
            return adapter.setAll(
                action.payload.banks, 
                { ...state, banksLoaded:true }
            );

        case(BanksActionTypes.BanksCleared):
                return initialBanksState;
        

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

