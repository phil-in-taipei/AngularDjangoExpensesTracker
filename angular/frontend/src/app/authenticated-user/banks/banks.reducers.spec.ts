import { 
    banksData 
} from "src/app/test-data/authenticated-user-module-tests/banks-tests/banks-data";
import { 
    stateWithLoadedBanks 
} from "src/app/test-data/authenticated-user-module-tests/banks-tests/banks-state";
import { banksReducer, initialBanksState } from "./banks.reducers";
import { BanksCleared, BanksLoaded } from "./banks.actions";

describe('banksReducer', () => {
    it('returns an initial state when cleared', () =>{
        const state = banksReducer(initialBanksState, new BanksCleared());
        expect(state).toEqual(initialBanksState);
    });

    it('returns the state with banks entity and indicates that ' 
        + 'the banks have been loaded', () => {
        const state = banksReducer(initialBanksState, 
        new BanksLoaded({ banks: banksData }));
        expect(state).toEqual(stateWithLoadedBanks.banks);
    });
});