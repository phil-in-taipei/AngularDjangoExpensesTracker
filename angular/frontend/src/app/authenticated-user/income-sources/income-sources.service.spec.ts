import { TestBed, fakeAsync, flush  } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { authData } from '../../test-data/authentication-tests/authentication-data';
import { AuthService } from '../../authentication/auth.service';
import { environment } from 'src/environments/environment';

import { 
  createdIncomeSource, incomeSourceDeletionResponse, 
  incomeSourcesData,  newIncomeSourceData 
} from 'src/app/test-data/authenticated-user-module-tests/income-sources-tests/income-sources-data';

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

  //it('should be created', () => {
  //  expect(service).toBeTruthy();
  //});
  it("should handle network error when " 
    + "fetching users' income sources", () => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchAllIncomeSources().subscribe(
        () => {},
        error => {
          expect(error).toBeTruthy();
        }
      );
    
      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/income/income-sources/`,
      });

      request.error(new ErrorEvent('network error'));
      
  });


  it('should return a new income source object from backend after submitting ' 
    + 'data to create a new income source', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitNewIncomeSource(newIncomeSourceData).subscribe(response => {
        expect(response).toEqual(createdIncomeSource);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/income/income-sources/`,
      });

      request.flush(createdIncomeSource);

      flush();

  }));


    // this response is important because the id value in the response will be used
    // to update state by indicating id of the entity to be removed (ngrx/entity)
    it('should return a response message from backend after deletion ' 
      + 'with a message and the income source id', 
        fakeAsync(() => {
          authServiceSpy.getAuthToken.and.returnValue(authData.token);

          service.deleteIncomeSource(2).subscribe(response => {
            expect(response.id).toEqual(2);
            expect(response).toEqual(incomeSourceDeletionResponse);
          });

          const request = httpTestingController.expectOne({
            method: 'DELETE',
            url:`${environment.apiUrl}/api/income/income-source/2/`,
          });

          request.flush(incomeSourceDeletionResponse);

          flush()

    }));

  it("should return the array of users' income sources from the api", 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchAllIncomeSources().subscribe(response => {
        expect(response).toEqual(incomeSourcesData);
      });

      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/income/income-sources/`,
      });

      request.flush(incomeSourcesData);

      flush();

  }));

  afterEach(() => {
    httpTestingController.verify();
  });
});
