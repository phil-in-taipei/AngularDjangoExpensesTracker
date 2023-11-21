import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of, catchError } from "rxjs";

import { TransactionModel, WithdrawalCreateModel } from 'src/app/models/transaction-model';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { TransactionsService } from '../../../transactions.service';

@Component({
  selector: 'app-withdrawal-submit-form',
  templateUrl: './withdrawal-submit-form.component.html',
  styleUrls: ['./withdrawal-submit-form.component.css']
})
export class WithdrawalSubmitFormComponent implements OnInit {

  dateModel: Date;
  newWithdrawal$: Observable<TransactionModel | undefined> = of(undefined);
  @Input() savingsAccounts: SavingsAccountModel[];
  errorMessage: string | undefined = undefined;

  constructor(
    private transactionsService: TransactionsService
    ) { }

  ngOnInit(): void {
  }

  onClearErrorMessage(): void {
    this.errorMessage = undefined;
  }

  onClearNewlySubmittedWithdrawal(): void {
    this.newWithdrawal$ = of(undefined);
  }

  onSubmitWithdrawal(form: NgForm) {
    this.onClearErrorMessage();
    this.onClearNewlySubmittedWithdrawal();
    if (form.invalid) {
      console.log('form error')
      this.errorMessage = "The form values were not properly filled in!"
      return;
    }
    const data: WithdrawalCreateModel = {
      date: `${form.value.date.year}-${form.value.date.month}-${form.value.date.day}`,
      amount: form.value.amount,
      savings_account: +form.value.savings_account,
    };
    console.log('this is the data to be sent to backend:')
    console.log(data);
    this.newWithdrawal$ = this.transactionsService.submitNewWithdrawal(data).pipe(
     catchError(error => {
       if (error.error instanceof ErrorEvent) {
           this.errorMessage = `Error: ${error.error.message}`;
       } else {
           this.errorMessage = `Error: ${error.message}`;
       }
       return of(undefined);
   }))
    form.reset();
  };
}
