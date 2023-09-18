import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import { initialBanksState } from './banks.reducers';
import { 
    banksData 
} from 'src/app/test-data/authenticated-user-module-tests/banks-tests/banks-data';
import { BanksLoaded, BanksRequested } from './banks.actions';
import { BanksEffects } from './banks.effects';
import { banksLoaded } from './banks.selectors';
import { BankModel } from 'src/app/models/bank.model';
import { BanksService } from './banks.service';

describe('BanksEffects', () => {
    let effects: BanksEffects;
    let banksService: BanksService;

    beforeEach(() => {
        const mockBanksService = {
            fetchAllBanks(): Observable<BankModel[]> {
                return of(banksData);
          }
        };
        TestBed.configureTestingModule({    
            providers: [
                provideMockStore({
                    initialState: initialBanksState,
                    selectors: [
                        {
                          selector: banksLoaded,
                          value: false
                        }
                      ]
                }),
                provideMockActions(from([new BanksRequested(),])),
                BanksEffects,
                { provide: BanksService, useValue: mockBanksService }
    
              ]
        });

        effects = TestBed.inject(BanksEffects);
        banksService = TestBed.inject(BanksService);
    });

    it('should call fetch the banks if the banks have ' 
        + 'not already been loaded into state', 
        fakeAsync(() => {
        spyOn(banksService, 'fetchAllBanks').and.returnValue(of(banksData));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [new BanksLoaded({ banks: banksData })];
        
        effects.loadBanks$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
          }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));
});