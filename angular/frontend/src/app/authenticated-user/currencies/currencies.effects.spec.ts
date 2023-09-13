import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import {  
    initialCurrenciesState } from "./currencies.reducers";
import { 
    currenciesData 
} from "src/app/test-data/authenticated-user-module-tests/currencies-tests/currencies-data";
import { CurrenciesLoaded, 
         CurrenciesRequested } from "./currencies.actions";
import { CurrenciesEffects } from './currencies.effects';
import { currenciesLoaded } from "./currencies.selectors";
import { CurrenciesService } from './currencies.service';
import { CurrencyModel } from 'src/app/models/currency.model';

describe('CurrenciesEffects', () => {
    let effects: CurrenciesEffects;
    let currenciesService: CurrenciesService;

    beforeEach(() => {
        const mockCurrenciesService = {
            fetchAllCurrencies(): Observable<CurrencyModel[]> {
                return of(currenciesData);
          }
        };
        TestBed.configureTestingModule({    
            providers: [
                provideMockStore({
                    initialState: initialCurrenciesState,
                    selectors: [
                        {
                          selector: currenciesLoaded,
                          value: false
                        }
                      ]
                }),
                provideMockActions(from([new CurrenciesRequested(),])),
                CurrenciesEffects,
                { provide: CurrenciesService, useValue: mockCurrenciesService }
    
              ]
        });

        effects = TestBed.inject(CurrenciesEffects);
        currenciesService = TestBed.inject(CurrenciesService);
    });

    it('should call fetch the currencies if the currencies have ' 
        + 'not already be loaded into state', 
        fakeAsync(() => {
        spyOn(currenciesService, 'fetchAllCurrencies').and.returnValue(of(currenciesData));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [new CurrenciesLoaded({ currencies: currenciesData })];
        
        effects.loadCurrencies$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
          }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));
});