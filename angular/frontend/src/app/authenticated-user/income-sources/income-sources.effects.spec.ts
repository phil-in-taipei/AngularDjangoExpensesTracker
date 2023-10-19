import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import { initialIncomeSourcesState } from './income-sources.reducers';
import { 
    createdIncomeSource, editedIncomeSourceData, newIncomeSourceData, 
    incomeSourceDeletionResponse, incomeSourcesData 
} from 'src/app/test-data/authenticated-user-module-tests/income-sources-tests/income-sources-data';
import { 
    revisedIncomeSource
 } from 'src/app/test-data/authenticated-user-module-tests/income-sources-tests/income-sources-state';
import { 
    IncomeSourceAdded, IncomeSourceAddedCancelled, 
    IncomeSourceDeletionRequested, IncomeSourceDeletionSaved,
    IncomeSourceEditSubmitted, IncomeSourceEditUpdated,
    IncomeSourcesLoaded, IncomeSourcesRequested, IncomeSourceSubmitted
} from './income-sources.actions';
import { IncomeSourcesEffects } from './income-sources.effects';
import { incomeSourcesLoaded } from './income-sources.selectors';
import { 
    IncomeSourceCreateAndEditModel, 
    IncomeSourceDeletionResponse,
    IncomeSourceModel
} from 'src/app/models/income-source.model';
import { IncomeSourcesService } from './income-sources.service';
import { create } from 'domain';

fdescribe('IncomeSourcesEffects', () => {
    let effects: IncomeSourcesEffects;
    let incomeSourcesService: IncomeSourcesService;

    beforeEach(() => {
        const mockIncomeSourcesService = {
            fetchAllIncomeSources(): Observable<IncomeSourceModel[]> {
                return of(incomeSourcesData);
            },
            deleteIncomeSource(id: number): 
                Observable<IncomeSourceDeletionResponse> {
                    return of(incomeSourceDeletionResponse)
            },
            submitEditedIncomeSource(id: number, 
                    submissionForm:IncomeSourceCreateAndEditModel): 
                        Observable<IncomeSourceModel> {
                return of(revisedIncomeSource);
            },
            submitNewIncomeSource(
                submissionForm:IncomeSourceCreateAndEditModel): 
                        Observable<IncomeSourceModel> {
                return of(createdIncomeSource);
            },
        };

        TestBed.configureTestingModule({    
            providers: [
                provideMockStore({
                    initialState: initialIncomeSourcesState,
                    selectors: [
                        {
                          selector: incomeSourcesLoaded,
                          value: false
                        }
                      ]
                }),
                provideMockActions(from([
                    new IncomeSourceDeletionRequested(
                        {id: incomeSourceDeletionResponse.id}
                    ),
                    new IncomeSourcesRequested(),
                    new IncomeSourceSubmitted(
                        { incomeSource: newIncomeSourceData}
                    ),
                    new IncomeSourceEditSubmitted(
                        { id: 2, incomeSource: editedIncomeSourceData}
                    )
                ])),
                IncomeSourcesEffects,
                { provide: IncomeSourcesService, 
                  useValue: mockIncomeSourcesService }
              ]
        });
        effects = TestBed.inject(IncomeSourcesEffects);
        incomeSourcesService = TestBed.inject(IncomeSourcesService);
    });

    it('IncomeSourceDeletionRequested should handle the deletion response with message/id ' 
        + ' by calling the save method to remove the income source from state', 
        fakeAsync(() => {
        spyOn(incomeSourcesService, 'deleteIncomeSource')
            .and.returnValue(of(incomeSourceDeletionResponse));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [
            new IncomeSourceDeletionSaved(
            incomeSourceDeletionResponse)];
        
        effects.removeIncomeSource$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
        }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));


    it('IncomeSourcesRequested should call fetch the income sources' 
        + ' if they have not already been loaded into state', 
        fakeAsync(() => {
        spyOn(incomeSourcesService, 'fetchAllIncomeSources')
            .and.returnValue(of(incomeSourcesData));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [
            new IncomeSourcesLoaded(
            { incomeSources: incomeSourcesData })];
        
        effects.loadIncomeSources$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
        }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));

    it('IncomeSourceSubmitted should submit new income source data to backend ' 
        + ' and save the returned newly created object in state', 
      fakeAsync(() => {
        spyOn(incomeSourcesService, 'submitNewIncomeSource')
                .and.returnValue(of(createdIncomeSource));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [new IncomeSourceAdded(
            { incomeSource: createdIncomeSource }
        )];
        
        effects.submitIncomeSource$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
            }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));

    it('IncomeSourceEditSubmitted should submit an edited income source data to ' 
        + 'backend and save the returned newly revised object in state', 
      fakeAsync(() => {
        spyOn(incomeSourcesService, 'submitEditedIncomeSource')
                .and.returnValue(of(revisedIncomeSource));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [new IncomeSourceEditUpdated({ 
                incomeSource: { id: 2, changes: revisedIncomeSource } 
            })];
        
        effects.updateIncomeSource$.pipe(toArray()).subscribe((actualActions2) => {
            actualActions = actualActions2;
            }, fail);
        
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));

});
