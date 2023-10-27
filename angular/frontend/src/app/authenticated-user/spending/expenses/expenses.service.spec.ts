import { TestBed, fakeAsync, flush  } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { authData } from '../../../test-data/authentication-tests/authentication-data';
import { AuthService } from '../../../authentication/auth.service';
import { environment } from 'src/environments/environment';
import { 
  createdExpense, editedExpenseData, 
  expensesData, newExpenseData, 
  expenseDeletionResponse, updatedExpense
} from 'src/app/test-data/authenticated-user-module-tests/spending-module-tests/expenses-data';
import { ExpensesService } from './expenses.service';

describe('ExpensesService', () => {
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let service: ExpensesService;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ExpensesService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(ExpensesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  //it('should be created', () => {
  //  expect(service).toBeTruthy();
  //});

  it("should handle network error when " 
    + "fetching users' expenses", () => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchAllExpenses().subscribe(
        () => {},
        error => {
          expect(error).toBeTruthy();
        }
      );
    
      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/expenses/users-expenses/`,
      });

      request.error(new ErrorEvent('network error'));
      
  });

  it('should return an updated expense from backend after submitting ' 
    + 'data to edit the expense', 
      fakeAsync(() => {
        authServiceSpy.getAuthToken.and.returnValue(authData.token);

        service.submitEditedExpense(3, editedExpenseData).subscribe(response => {
          expect(response).toEqual(updatedExpense);
        });

        const request = httpTestingController.expectOne({
          method: 'PATCH',
          url:`${environment.apiUrl}/api/expenses/expense/3/`,
        });

        request.flush(updatedExpense);

        flush()

  }));


  it('should return a new expense object from backend after submitting ' 
    + 'data to create a new expense', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitNewExpense(newExpenseData).subscribe(response => {
        expect(response).toEqual(createdExpense);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/expenses/users-expenses/`,
      });

      request.flush(createdExpense);

      flush();

  }));


  // this response is important because the id value in the response will be used
  // to update state by indicating id of the entity to be removed (ngrx/entity)
  it('should return a response message from backend after deletion ' 
      + 'with a message and the expense id', 
    fakeAsync(() => {
       authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.deleteExpense(2).subscribe(response => {
        expect(response.id).toEqual(2);
          expect(response).toEqual(expenseDeletionResponse);
      });

      const request = httpTestingController.expectOne({
        method: 'DELETE',
        url:`${environment.apiUrl}/api/expenses/expense/2/`,
      });

      request.flush(expenseDeletionResponse);

      flush()

   }));


  it("should return the array of users' expenses from the api", 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchAllExpenses().subscribe(response => {
        expect(response).toEqual(expensesData);
      });

      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/expenses/users-expenses/`,
      });

      request.flush(expensesData);

      flush();

  }));


  afterEach(() => {
    httpTestingController.verify();
  });
});
