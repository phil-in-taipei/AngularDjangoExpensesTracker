import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../authentication/auth.service';
import { environment } from '../../../../environments/environment';
import { 
  ExpenseCreateAndUpdateModel, 
  ExpenseDeletionResponse,
  ExpenseModel 
} from 'src/app/models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  deleteExpense(id: number) {
    let token = this.authService.getAuthToken();
    return this.http.delete<ExpenseDeletionResponse>(
      `${environment.apiUrl}/api/expenses/expense/${id}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
  }

  fetchAllExpenses() {
    let token = this.authService.getAuthToken();
    return this.http.get<ExpenseModel[]>(
      `${environment.apiUrl}/api/expenses/users-expenses/`,
        {
            headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
  }

  submitEditedExpense(id: number,
    submissionForm:ExpenseCreateAndUpdateModel) {
    let token = this.authService.getAuthToken();
    return this.http.patch<ExpenseModel>(
      `${environment.apiUrl}/api/expenses/expense/${id}/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }

  submitNewExpense(
    submissionForm:ExpenseCreateAndUpdateModel) {
    let token = this.authService.getAuthToken();
    return this.http.post<ExpenseModel>(
      `${environment.apiUrl}/api/expenses/users-expenses/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }
}
