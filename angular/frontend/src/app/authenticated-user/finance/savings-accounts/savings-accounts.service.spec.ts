import { TestBed, fakeAsync, flush  } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { authData } from '../../../test-data/authentication-tests/authentication-data';
import { AuthService } from '../../../authentication/auth.service';
import { environment } from 'src/environments/environment';

import { SavingsAccountsService } from './savings-accounts.service';

import { 
  createdSavingsAccount, editedSavingsAccountData, newSavingsAccountData, 
  savingsAccountDeletionResponse, savingsAccountsData
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-data';

describe('SavingsAccountsService', () => {
  let service: SavingsAccountsService;
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        SavingsAccountsService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(SavingsAccountsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error due to network error when ' 
    + 'fetching savings accounts', () => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchAllSavingsAccounts().subscribe(
        () => {},
        error => {
          expect(error).toBeTruthy();
        }
      );
    
      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/financial-accounts/savings-accounts/`,
      });

      request.error(new ErrorEvent('network error'));
      
  });

  it('should return savings accounts array from the api', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchAllSavingsAccounts().subscribe(response => {
        expect(response).toEqual(savingsAccountsData);
      });

      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/financial-accounts/savings-accounts/`,
      });

      request.flush(savingsAccountsData);

      flush();

  }));

  it('should return a new savings account object from backend after submitting ' 
    + 'data to create a new account', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitNewSavingsAccount(newSavingsAccountData).subscribe(response => {
        expect(response).toEqual(createdSavingsAccount);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/financial-accounts/savings-accounts/`,
      });

      request.flush(createdSavingsAccount);

      flush();

    }));

    // this response is important because the id value in the response will be used
    // to update state by indicating id of the entity to be removed (ngrx/entity)
    it('should return a response message from backend after deletion ' 
      + 'with a message and the account id', 
        fakeAsync(() => {
          authServiceSpy.getAuthToken.and.returnValue(authData.token);

          service.deleteSavingsAccount(2).subscribe(response => {
            expect(response.id).toEqual(2);
            expect(response).toEqual(savingsAccountDeletionResponse);
          });

          const request = httpTestingController.expectOne({
            method: 'DELETE',
            url:`${environment.apiUrl}/api/financial-accounts/savings-account/2/`,
          });

          request.flush(savingsAccountDeletionResponse);

          flush()

    }));

    it('should return a revised account object from backend after submitting ' 
    + 'data to edit the account', 
      fakeAsync(() => {
        authServiceSpy.getAuthToken.and.returnValue(authData.token);
        let revisedSavingsAccount = { ...newSavingsAccountData, id: 3 };
        revisedSavingsAccount.account_balance = editedSavingsAccountData.account_balance;
        revisedSavingsAccount.account_name = editedSavingsAccountData.account_name;

        service.submitEditedSavingsAccount(3, editedSavingsAccountData).subscribe(response => {
          expect(response).toEqual(revisedSavingsAccount);
        });

        const request = httpTestingController.expectOne({
          method: 'PATCH',
          url:`${environment.apiUrl}/api/financial-accounts/savings-account/3/`,
        });

        request.flush(revisedSavingsAccount);

        flush()

      }));
});
