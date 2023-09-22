import { TestBed, fakeAsync, flush  } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { authData } from '../../../test-data/authentication-tests/authentication-data';
import { AuthService } from '../../../authentication/auth.service';
import { environment } from 'src/environments/environment';

import { SavingsAccountsService } from './savings-accounts.service';

import { 
  savingsAccountsData
} from 'src/app/test-data/authenticated-user-module-tests/finance-module-tests/savings-accounts-tests/savings-accounts-data';

fdescribe('SavingsAccountsService', () => {
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
});
