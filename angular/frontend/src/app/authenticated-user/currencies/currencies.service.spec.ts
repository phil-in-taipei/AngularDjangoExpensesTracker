import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { authData } from '../../test-data/authentication-tests/authentication-data';
import { AuthService } from '../../authentication/auth.service';
import { currenciesData } from 'src/app/test-data/authenticated-user-module-tests/currencies-tests/currencies-data';
import { CurrenciesService } from './currencies.service';
import { environment } from '../../../environments/environment';



describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CurrenciesService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(CurrenciesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error due to network error when fetching currencies', () => {
    authServiceSpy.getAuthToken.and.returnValue(authData.token);
    service.fetchAllCurrencies().subscribe(
      () => {},
      error => {
        expect(error).toBeTruthy();
      }
    );
  
    const request = httpTestingController.expectOne({
      method: 'GET',
      url:`${environment.apiUrl}/api/currencies/`,
    });

    request.error(new ErrorEvent('network error'));
  });

  it('should return currencies array from the api', 
    fakeAsync(() => {
    authServiceSpy.getAuthToken.and.returnValue(authData.token);
    service.fetchAllCurrencies().subscribe(response => {
      expect(response).toEqual(currenciesData);
    });

    const request = httpTestingController.expectOne({
      method: 'GET',
      url:`${environment.apiUrl}/api/currencies/`,
    });

    request.flush(currenciesData);

    flush();

  }));
});
