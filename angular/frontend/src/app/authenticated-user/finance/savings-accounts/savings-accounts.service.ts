import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../authentication/auth.service';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';

@Injectable({
  providedIn: 'root'
})
export class SavingsAccountsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

    fetchAllSavingsAccounts() {
      let token = this.authService.getAuthToken();
      return this.http.get<SavingsAccountModel[]>(
        `${environment.apiUrl}/api/financial-accounts/savings-accounts/`,
          {
              headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
          })
      }
}
