import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../authentication/auth.service';
import { SavingsAccountModel, 
  SavingsAccountCreateModel, 
  SavingsAccountDeletionResponse,
  SavingsAccountEditModel 
} from 'src/app/models/savings-account.model';


@Injectable({
  providedIn: 'root'
})
export class SavingsAccountsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

    deleteSavingsAccount(id: number) {
      let token = this.authService.getAuthToken();
      return this.http.delete<SavingsAccountDeletionResponse>(
        `${environment.apiUrl}/api/financial-accounts/savings-account/${id}/`,
          {
            headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
          })
    }

    fetchAllSavingsAccounts() {
      let token = this.authService.getAuthToken();
      return this.http.get<SavingsAccountModel[]>(
        `${environment.apiUrl}/api/financial-accounts/savings-accounts/`,
          {
              headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
          })
    }

    submitEditedSavingsAccount(
      submissionForm:SavingsAccountCreateModel, id: number) {
      //console.log('submitting savings account ....');
      let token = this.authService.getAuthToken();
      //console.log(token);
      return this.http.patch<SavingsAccountModel>(
        `${environment.apiUrl}/api/financial-accounts/savings-account/${id}/`, submissionForm,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        });
    }

    submitNewSavingsAccount(
      submissionForm:SavingsAccountCreateModel) {
      //console.log('submitting savings account ....');
      let token = this.authService.getAuthToken();
      //console.log(token);
      return this.http.post<SavingsAccountModel>(
        `${environment.apiUrl}/api/financial-accounts/savings-accounts/`, submissionForm,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        });
    }
}
