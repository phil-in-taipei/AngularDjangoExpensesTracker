import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../authentication/auth.service';

import { 
  DepositCreateModel, 
  TransactionDeletionResponse, 
  TransactionModel, WithdrawalCreateModel 
} from 'src/app/models/transaction-model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  deleteDeposit(id: number) {
    let token = this.authService.getAuthToken();
    return this.http.delete<TransactionDeletionResponse>(
      `${environment.apiUrl}/api/transactions/submit/deposit/${id}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
  }

  deleteWithdrawal(id: number) {
    let token = this.authService.getAuthToken();
    return this.http.delete<TransactionDeletionResponse>(
      `${environment.apiUrl}/api/transactions/submit/withdrawal/${id}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
  }

  fetchAccountTransactionsByMonthAndYear(month: number, year: number, accountId: number) {
    let token = this.authService.getAuthToken();
    return this.http.get<TransactionModel[]>(
      `${environment.apiUrl}/api/transactions/account-transactions/by-month-year/${month}/${year}/${accountId}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
  }
  

  fetchDepositsByMonthAndYear(month: number, year: number) {
    let token = this.authService.getAuthToken();
    return this.http.get<TransactionModel[]>(
      `${environment.apiUrl}/api/transactions/deposits/by-month-year/${month}/${year}/`,
        {
            headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
         })
  }

  fetchWithdrawalsByMonthAndYear(month: number, year: number) {
    let token = this.authService.getAuthToken();
    return this.http.get<TransactionModel[]>(
      `${environment.apiUrl}/api/transactions/withdrawals/by-month-year/${month}/${year}/`,
        {
            headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
         })
  }

  formatThousand(value: number) {
    if (!value) return ''
    let strValue = value.toString()
    return strValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }


  removeTransactionFromArrayById(
    transactions: TransactionModel[], id: number
    ) {
    return transactions.filter((transaction) => transaction.id !== id);
  }

  submitNewDeposit(
    submissionForm:DepositCreateModel) {
    let token = this.authService.getAuthToken();
    return this.http.post<TransactionModel>(
      `${environment.apiUrl}/api/transactions/submit/deposit/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }

  submitNewWithdrawal(
    submissionForm:WithdrawalCreateModel) {
    let token = this.authService.getAuthToken();
    return this.http.post<TransactionModel>(
      `${environment.apiUrl}/api/transactions/submit/withdrawal/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }

}
