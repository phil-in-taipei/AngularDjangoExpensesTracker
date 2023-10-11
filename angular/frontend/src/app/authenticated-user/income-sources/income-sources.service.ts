import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';

import { 
  IncomeSourceCreateModel, IncomeSourceDeletionResponse,
  IncomeSourceModel } from 'src/app/models/income-source.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeSourcesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  deleteIncomeSource(id: number) {
    let token = this.authService.getAuthToken();
    return this.http.delete<IncomeSourceDeletionResponse>(
      `${environment.apiUrl}/api/income/income-source/${id}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
    }

  fetchAllIncomeSources() {
    let token = this.authService.getAuthToken();
    return this.http.get<IncomeSourceModel[]>(
      `${environment.apiUrl}/api/income/income-sources/`,
        {
            headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
  }

  submitNewIncomeSource(
    submissionForm:IncomeSourceCreateModel) {
    //console.log('submitting income source ....');
    let token = this.authService.getAuthToken();
    //console.log(token);
    return this.http.post<IncomeSourceModel>(
      `${environment.apiUrl}/api/income/income-sources/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }
}
