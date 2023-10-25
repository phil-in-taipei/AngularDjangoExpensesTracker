import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../authentication/auth.service';
import { environment } from '../../../../environments/environment';

import { 
  SpendingRecordCreateModel, 
  SpendingRecordDeletionResponse, 
  SpendingRecordModel 
} from 'src/app/models/spending-record.model';

@Injectable({
  providedIn: 'root'
})
export class SpendingRecordsService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }


    deleteSpendingRecord(id: number) {
      let token = this.authService.getAuthToken();
      return this.http.delete<SpendingRecordDeletionResponse>(
        `${environment.apiUrl}/api/expenses/spending-record/${id}/`,
          {
            headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
          })
    }
  
    fetchSpendingRecordsByMonthAndYear(month: number, year: number) {
      let token = this.authService.getAuthToken();
      return this.http.get<SpendingRecordModel[]>(
        `${environment.apiUrl}/api/expenses/spending-records/by-month-year/${month}/${year}/`,
          {
              headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
          })
    }

    submitNewSpendingRecord(
      submissionForm:SpendingRecordCreateModel) {
      let token = this.authService.getAuthToken();
      return this.http.post<SpendingRecordModel>(
        `${environment.apiUrl}/api/expenses/spending-records/`, submissionForm,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        });
    }

}
