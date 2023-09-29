import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import { initialSavingsAccountsState } from './savings-accounts.reducers';
import { 
    createdSavingsAccount, newSavingsAccountData, savingsAccountsData
  } from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-data';
import { SavingsAccountAdded, SavingsAccountsLoaded, 
    SavingsAccountsRequested, SavingsAccountSubmitted,
} from './savings-accounts.actions';  
import { SavingsAccountsEffects } from './savings-accounts.effects';
import { savingsAccountsLoaded } from './savings-accounts.selectors';
import { 
    SavingsAccountCreateModel, SavingsAccountModel 
} from 'src/app/models/savings-account.model';
import { SavingsAccountsService } from './savings-accounts.service';

fdescribe('SavingsAccountsEffects', () => {
    let effects: SavingsAccountsEffects;
    let savingssAccountsService: SavingsAccountsService;

    beforeEach(() => {
        const mockSavingsAccountsService = {
            fetchAllSavingsAccounts(): Observable<SavingsAccountModel[]> {
                return of(savingsAccountsData);
            },
            submitNewSavingsAccount(
                submissionForm:SavingsAccountCreateModel): 
                        Observable<SavingsAccountModel> {
                return of(createdSavingsAccount);
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
                provideMockActions(from([
                    new SavingsAccountsRequested(),
                    new SavingsAccountSubmitted(
                        { savingsAccount: newSavingsAccountData}
                    )
                ])),
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

    it('should submit new savings account data to backend and save the returned ' 
        + 'newly created savings account in state', 
      fakeAsync(() => {
        spyOn(savingssAccountsService, 'submitNewSavingsAccount')
                .and.returnValue(of(createdSavingsAccount));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [new SavingsAccountAdded(
            { savingsAccount: createdSavingsAccount }
        )];
        
        effects.submitSavingsAccount$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
            }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));
});