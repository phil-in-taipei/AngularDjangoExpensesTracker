import { 
    stateWithLoadedCurrencies 
} from "src/app/test-data/authenticated-user-module-tests/currencies-tests/currencies-state";
import { currenciesReducer, 
    initialCurrenciesState } from "./currencies.reducers";
import { 
    currenciesData 
} from "src/app/test-data/authenticated-user-module-tests/currencies-tests/currencies-data";
import { CurrenciesCleared, 
    CurrenciesLoaded } from "./currencies.actions";


describe('currenciesReducer', () => {
    it('returns an initial state when cleared', () => {
        const state = currenciesReducer(initialCurrenciesState, new CurrenciesCleared());
        expect(state).toEqual(initialCurrenciesState);
    });

    it('returns the state with currency entity and indicates that ' 
        + 'the currencies have been loaded', () => {
        const state = currenciesReducer(initialCurrenciesState, 
            new CurrenciesLoaded({ currencies: currenciesData }));
        expect(state).toEqual(stateWithLoadedCurrencies.currencies);
    });
});
