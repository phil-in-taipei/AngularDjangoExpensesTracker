import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import { initialSavingsAccountsState } from './savings-accounts.reducers';
import { 
    createdSavingsAccount, editedSavingsAccountData, 
    newSavingsAccountData, savingsAccountsData
  } from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-data';
import { revisedSavingsAccount 
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-state';
import { SavingsAccountAdded, SavingsAccountEditSubmitted, SavingsAccountEditUpdated, 
    SavingsAccountsLoaded, SavingsAccountsRequested, SavingsAccountSubmitted,
} from './savings-accounts.actions';  
import { SavingsAccountsEffects } from './savings-accounts.effects';
import { savingsAccountsLoaded } from './savings-accounts.selectors';
import { 
    SavingsAccountCreateModel, SavingsAccountDeletionResponse, 
    SavingsAccountEditModel, SavingsAccountModel 
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
            submitEditedSavingsAccount(id: number, 
                    submissionForm:SavingsAccountEditModel): 
                        Observable<SavingsAccountModel> {
                return of(revisedSavingsAccount);
            },
            submitNewSavingsAccount(
                submissionForm:SavingsAccountCreateModel): 
                        Observable<SavingsAccountModel> {
                return of(createdSavingsAccount);
            },
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
                    ),
                    new SavingsAccountEditSubmitted(
                        { id: 2, savingsAccount: editedSavingsAccountData}
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

    it('SavingsAccountsRequested should call fetch the savings accounts' 
        + ' if the savings accounts have not already been loaded into state', 
        fakeAsync(() => {
        spyOn(savingssAccountsService, 'fetchAllSavingsAccounts')
            .and.returnValue(of(savingsAccountsData));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [
            new SavingsAccountsLoaded(
            { savingsAccounts: savingsAccountsData })];
        
        effects.loadSavingsAccounts$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
        }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));

    it('SavingsAccountSubmitted should submit new savings account data to backend ' 
        + ' and save the returned newly created savings account in state', 
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


    it('SavingsAccountEditSubmitted should submit an edited savings account data to ' 
        + 'backend and save the returned newly revised savings account in state', 
      fakeAsync(() => {
        spyOn(savingssAccountsService, 'submitEditedSavingsAccount')
                .and.returnValue(of(revisedSavingsAccount));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [new SavingsAccountEditUpdated({ 
                savingsAccount: { id: 2, changes: revisedSavingsAccount } 
            })];
        
        effects.updateSavingsAccount$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
            }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));
});