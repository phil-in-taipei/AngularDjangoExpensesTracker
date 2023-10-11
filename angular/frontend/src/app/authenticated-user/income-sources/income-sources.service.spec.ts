import { TestBed, fakeAsync, flush  } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { authData } from '../../test-data/authentication-tests/authentication-data';
import { AuthService } from '../../authentication/auth.service';
import { environment } from 'src/environments/environment';

import { IncomeSourcesService } from './income-sources.service';

fdescribe('IncomeSourcesService', () => {
  let service: IncomeSourcesService;
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        IncomeSourcesService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(IncomeSourcesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
