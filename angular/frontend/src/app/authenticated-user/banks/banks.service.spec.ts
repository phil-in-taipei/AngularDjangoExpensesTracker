import { TestBed, fakeAsync, flush  } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { authData } from '../../test-data/authentication-tests/authentication-data';
import { AuthService } from '../../authentication/auth.service';

import { BanksService } from './banks.service';
import { environment } from 'src/environments/environment';

import { 
  banksData 
} from 'src/app/test-data/authenticated-user-module-tests/banks-tests/banks-data';

describe('BanksService', () => {
  let service: BanksService;
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        BanksService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(BanksService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  //it('should be created', () => {
  //  expect(service).toBeTruthy();
  //});

  it('should handle error due to network error when fetching banks', () => {
    authServiceSpy.getAuthToken.and.returnValue(authData.token);
    service.fetchAllBanks().subscribe(
      () => {},
      error => {
        expect(error).toBeTruthy();
      }
    );
  
    const request = httpTestingController.expectOne({
      method: 'GET',
      url:`${environment.apiUrl}/api/financial-accounts/banks/`,
    });

    request.error(new ErrorEvent('network error'));
    
  });

  it('should return banks array from the api', 
    fakeAsync(() => {
    authServiceSpy.getAuthToken.and.returnValue(authData.token);
    service.fetchAllBanks().subscribe(response => {
      expect(response).toEqual(banksData);
    });

    const request = httpTestingController.expectOne({
      method: 'GET',
      url:`${environment.apiUrl}/api/financial-accounts/banks/`,
    });

    request.flush(banksData);

    flush();

  }));

  afterEach(() => {
    httpTestingController.verify();
  });

});
