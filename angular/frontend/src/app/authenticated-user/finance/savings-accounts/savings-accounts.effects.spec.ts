import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import { initialSavingsAccountsState } from './savings-accounts.reducers';
import { 
    savingsAccountsData
  } from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-data';
import { SavingsAccountsLoaded, 
    SavingsAccountsRequested } from './savings-accounts.actions';  
import { SavingsAccountsEffects } from './savings-accounts.effects';
import { savingsAccountsLoaded } from './savings-accounts.selectors';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { SavingsAccountsService } from './savings-accounts.service';

fdescribe('SavingsAccountsEffects', () => {
    let effects: SavingsAccountsEffects;
    let savingssAccountsService: SavingsAccountsService;

    beforeEach(() => {
        const mockSavingsAccountsService = {
            fetchAllSavingsAccounts(): Observable<SavingsAccountModel[]> {
                return of(savingsAccountsData);
          }
        };

        TestBed.configureTestingModule({    
            providers: [
                provideMockStore({
                    initialState: initialSavingsAccountsState,
                    selectors: [
                        {
                          selector: savingsAccountsLoaded,
                          value: false
                        }
                      ]
                }),
                provideMockActions(from([new SavingsAccountsRequested(),])),
                SavingsAccountsEffects,
                { provide: SavingsAccountsService, 
                  useValue: mockSavingsAccountsService }
              ]
        });


        effects = TestBed.inject(SavingsAccountsEffects);
        savingssAccountsService = TestBed.inject(SavingsAccountsService);
    });

    it('should call fetch the savings accounts if the savings accounts have ' 
        + 'not already been loaded into state', 
        fakeAsync(() => {
        spyOn(savingssAccountsService, 'fetchAllSavingsAccounts')
            .and.returnValue(of(savingsAccountsData));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [new SavingsAccountsLoaded(
            { savingsAccounts: savingsAccountsData })];
        
        effects.loadSavingsAccounts$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
        }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));
});