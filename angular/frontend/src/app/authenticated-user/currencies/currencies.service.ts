import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';
import { CurrencyModel } from 'src/app/models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  fetchAllCurrencies() {
    let token = this.authService.getAuthToken();
    return this.http.get<CurrencyModel[]>(
      `${environment.apiUrl}/api/currencies/`,
        {
            headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
    }
}
