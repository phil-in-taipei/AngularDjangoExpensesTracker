import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';
import { BankModel } from 'src/app/models/bank.model';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  fetchAllBanks() {
      let token = this.authService.getAuthToken();
      return this.http.get<BankModel[]>(
        `${environment.apiUrl}/api/financial-accounts/banks/`,
          {
              headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
          })
      }
}
