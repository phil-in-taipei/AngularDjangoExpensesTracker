import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import { initialSpendingRecordsState } from './spending-records.reducers';
import {
    createdSpendingRecord, newSpendingRecordData,
    spendingRecordDeletionResponse, spendingRecordsData
} from 'src/app/test-data/authenticated-user-module-tests/spending-module-tests/spending-records-data';
import {
    SpendingRecordAdded, SpendingRecordDeletionRequested, SpendingRecordDeletionSaved,
    SpendingRecordsLoaded, SpendingRecordsRequested, SpendingRecordSubmitted
} from './spending-records.actions';
import { SpendingRecordsEffects } from './spending-records.effects';
import { spendingRecordsLoaded } from './spending-records.selectors';
import {
    SpendingRecordCreateModel, SpendingRecordDeletionResponse, SpendingRecordModel
} from 'src/app/models/spending-record.model';
import { SpendingRecordsService } from './spending-records.service';

describe('SpendingRecordsEffects', () => {
    let effects: SpendingRecordsEffects;
    let spendingRecordsService: SpendingRecordsService;
    const today: Date = new Date();

    beforeEach(() => {
        const mockSpendingRecordsService = {
            fetchSpendingRecordsByMonthAndYear(): Observable<SpendingRecordModel[]> {
              return of(spendingRecordsData);
            },
            deleteSpendingRecord(id: number):
              Observable<SpendingRecordDeletionResponse> {
                return of(spendingRecordDeletionResponse)
            },
            submitNewSpendingRecord(
              submissionForm:SpendingRecordCreateModel):
                  Observable<SpendingRecordModel> {
                return of(createdSpendingRecord);
            },
        };

        TestBed.configureTestingModule({
          providers: [
              provideMockStore({
                  initialState: initialSpendingRecordsState,
                  selectors: [
                      {
                        selector: spendingRecordsLoaded,
                        value: false
                      }
                    ]
              }),
              provideMockActions(from([
                  new SpendingRecordDeletionRequested(
                      {id: spendingRecordDeletionResponse.id}
                  ),
                  new SpendingRecordsRequested({ month: today.getMonth() + 1, year: today.getFullYear() }),
                  new SpendingRecordSubmitted(
                      { spendingRecord: newSpendingRecordData}
                  )
              ])),
              SpendingRecordsEffects,
              { provide: SpendingRecordsService,
                useValue: mockSpendingRecordsService }
            ]
          });
          effects = TestBed.inject(SpendingRecordsEffects);
          spendingRecordsService = TestBed.inject(SpendingRecordsService);
      });

      it('SpendingRecordsRequested should call fetch the spending records'
            + ' for the current month and load them into state',
          fakeAsync(() => {
          spyOn(spendingRecordsService, 'fetchSpendingRecordsByMonthAndYear')
              .and.returnValue(of(spendingRecordsData));
          let actualActions: Action[] | undefined;
          const expectedActions: Action[] = [
              new SpendingRecordsLoaded(
              { spendingRecords: spendingRecordsData })];

          effects.loadSpendingRecords$.pipe(toArray()).subscribe((actualActions2) => {
              actualActions = actualActions2;
          }, fail);

          expect(actualActions).toEqual(expectedActions);
          flush();
      }));

      it('SpendingRecordDeletionRequested should handle the deletion response with message/id '
            + ' by calling the save method to remove the spending record from state',
          fakeAsync(() => {
          spyOn(spendingRecordsService, 'deleteSpendingRecord')
              .and.returnValue(of(spendingRecordDeletionResponse));
          let actualActions: Action[] | undefined;
          const expectedActions: Action[] = [
              new SpendingRecordDeletionSaved(
                  spendingRecordDeletionResponse)];

          effects.removeSpendingRecord$.pipe(toArray()).subscribe((actualActions2) => {
              actualActions = actualActions2;
          }, fail);

          expect(actualActions).toEqual(expectedActions);
          flush();
      }));

      it('SpendingRecordSubmitted should submit new spending record data to backend '
            + ' and save the returned newly created object in state',
          fakeAsync(() => {
          spyOn(spendingRecordsService, 'submitNewSpendingRecord')
                .and.returnValue(of(createdSpendingRecord));
          let actualActions: Action[] | undefined;
          const expectedActions: Action[] = [new SpendingRecordAdded(
              { spendingRecord: createdSpendingRecord }
          )];

          effects.submitSpendingRecord$.pipe(toArray()).subscribe((actualActions2) => {
              actualActions = actualActions2;
              }, fail);

          expect(actualActions).toEqual(expectedActions);
          flush();
      }));
});
