import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { 
  HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { authData } from '../../../test-data/authentication-tests/authentication-data';
import { AuthService } from '../../../authentication/auth.service';
import { environment } from 'src/environments/environment';

import { TransactionsService } from './transactions.service';

import { 
  createdDeposit, depositsData, depositDeletionResponse, newDepositData
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/deposits-data';

import { 
  createdWithdrawal, newWithdrawalData, withdrawalDeletionResponse, withdrawalsData 
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/withdrawals-data';

fdescribe('TransactionsService', () => {
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let service: TransactionsService;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        TransactionsService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(TransactionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it("should handle network error when fetching users' " 
    + "deposits for this month", () => {
      const today: Date = new Date();
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchDepositsByMonthAndYear(
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
        url:`${environment.apiUrl}/api/transactions/deposits/by-month-year/` 
        + `${today.getMonth() + 1}/${today.getFullYear()}/`,
      });

      request.error(new ErrorEvent('network error'));
      
  });

  it("should handle network error when fetching users' " 
    + "withdrawals for this month", () => {
      const today: Date = new Date();
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchWithdrawalsByMonthAndYear(
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
        url:`${environment.apiUrl}/api/transactions/withdrawals/by-month-year/` 
        + `${today.getMonth() + 1}/${today.getFullYear()}/`,
      });

      request.error(new ErrorEvent('network error'));
      
  });



  it("should return the array of users' deposits for this month from the api", 
    fakeAsync(() => {
    const today: Date = new Date();

    authServiceSpy.getAuthToken.and.returnValue(authData.token);

    service.fetchDepositsByMonthAndYear(
      today.getMonth() + 1, today.getFullYear()
      ).subscribe(response => {
      expect(response).toEqual(depositsData);
    });

    const request = httpTestingController.expectOne({
      method: 'GET',
      url:`${environment.apiUrl}/api/transactions/deposits/by-month-year/` 
          + `${today.getMonth() + 1}/${today.getFullYear()}/`,
    });

    request.flush(depositsData);

    flush();

  }));


  it("should return the array of users' withdrawals for this month from the api", 
    fakeAsync(() => {
    const today: Date = new Date();

    authServiceSpy.getAuthToken.and.returnValue(authData.token);

    service.fetchWithdrawalsByMonthAndYear(
      today.getMonth() + 1, today.getFullYear()
      ).subscribe(response => {
      expect(response).toEqual(withdrawalsData);
    });

    const request = httpTestingController.expectOne({
      method: 'GET',
      url:`${environment.apiUrl}/api/transactions/withdrawals/by-month-year/` 
          + `${today.getMonth() + 1}/${today.getFullYear()}/`,
    });

    request.flush(withdrawalsData);

    flush();

  }));

  it('should return a new deposit object from backend after submitting ' 
    + 'data to create a new object', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitNewDeposit(newDepositData).subscribe(response => {
        expect(response).toEqual(createdDeposit);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/transactions/submit/deposit/`,
      });

      request.flush(createdDeposit);

      flush();

  }));


  it('should return a new withdrawal object from backend after submitting ' 
    + 'data to create a new object', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitNewWithdrawal(newWithdrawalData).subscribe(response => {
        expect(response).toEqual(createdWithdrawal);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/transactions/submit/withdrawal/`,
      });

      request.flush(createdWithdrawal);

      flush();

  }));

  // this response is important because the id value in the response will be used
  // to update state by indicating id of the entity to be removed (ngrx/entity)
  it('should return a response message from backend after deletion of deposit' 
      + 'with a message and the expense id', 
    fakeAsync(() => {
       authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.deleteDeposit(2).subscribe(response => {
        expect(response.id).toEqual(2);
          expect(response).toEqual(depositDeletionResponse);
      });

      const request = httpTestingController.expectOne({
        method: 'DELETE',
        url:`${environment.apiUrl}/api/transactions/submit/deposit/2/`,
      });

      request.flush(depositDeletionResponse);

      flush()

   }));

  // this response is important because the id value in the response will be used
  // to update state by indicating id of the entity to be removed (ngrx/entity)
  it('should return a response message from backend after deletion of withdrawal' 
      + 'with a message and the expense id', 
    fakeAsync(() => {
       authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.deleteWithdrawal(2).subscribe(response => {
        expect(response.id).toEqual(2);
          expect(response).toEqual(withdrawalDeletionResponse);
      });

      const request = httpTestingController.expectOne({
        method: 'DELETE',
        url:`${environment.apiUrl}/api/transactions/submit/withdrawal/2/`,
      });

      request.flush(withdrawalDeletionResponse);

      flush()

   }));

  afterEach(() => {
    httpTestingController.verify();
  });


});
