import { TestBed, fakeAsync, flush  } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { authData } from '../../../test-data/authentication-tests/authentication-data';
import { AuthService } from '../../../authentication/auth.service';
import { environment } from 'src/environments/environment';
import { 
  createdSpendingRecord, newSpendingRecordData, 
  spendingRecordsData, spendingRecordDeletionResponse 
} from 'src/app/test-data/authenticated-user-module-tests/spending-module-tests/spending-records-data';
import { SpendingRecordsService } from './spending-records.service';

fdescribe('SpendingRecordsService', () => {
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let service: SpendingRecordsService;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        SpendingRecordsService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(SpendingRecordsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it("should handle network error when fetching users' " 
    + "spending records for this month", () => {
      const today: Date = new Date();
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchSpendingRecordsByMonthAndYear(
        today.getMonth() + 1, today.getFullYear()).subscribe(
        () => {},
        error => {
          expect(error).toBeTruthy();
        }
      );
      
      // getMonth() returns values beginning with '0' -- 1 must be added to get
      // current month value to be correctly queried on backend 
      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/expenses/spending-records/by-month-year/` 
        + `${today.getMonth() + 1}/${today.getFullYear()}/`,
      });

      request.error(new ErrorEvent('network error'));
      
  });

  it('should return a new spending record object from backend after submitting ' 
    + 'data to create a new object', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitNewSpendingRecord(newSpendingRecordData).subscribe(response => {
        expect(response).toEqual(createdSpendingRecord);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/expenses/spending-records/`,
      });

      request.flush(createdSpendingRecord);

      flush();

  }));


  // this response is important because the id value in the response will be used
  // to update state by indicating id of the entity to be removed (ngrx/entity)
  it('should return a response message from backend after deletion ' 
      + 'with a message and the expense id', 
    fakeAsync(() => {
       authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.deleteSpendingRecord(2).subscribe(response => {
        expect(response.id).toEqual(2);
          expect(response).toEqual(spendingRecordDeletionResponse);
      });

      const request = httpTestingController.expectOne({
        method: 'DELETE',
        url:`${environment.apiUrl}/api/expenses/spending-record/2/`,
      });

      request.flush(spendingRecordDeletionResponse);

      flush()

   }));

  it("should return the array of users' spending records for this month from the api", 
    fakeAsync(() => {
      // getMonth() returns values beginning with '0' -- 1 must be added to get
      // current month value to be correctly queried on backend 
      const today: Date = new Date();
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchSpendingRecordsByMonthAndYear(
        today.getMonth() + 1, today.getFullYear()
        ).subscribe(response => {
        expect(response).toEqual(spendingRecordsData);
      });
      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/expenses/spending-records/by-month-year/` 
            + `${today.getMonth() + 1}/${today.getFullYear()}/`,
      });

      request.flush(spendingRecordsData);

      flush();

  }));


  afterEach(() => {
    httpTestingController.verify();
  });
});
