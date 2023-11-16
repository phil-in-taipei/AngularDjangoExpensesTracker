import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of, catchError } from "rxjs";

import { DepositCreateModel, TransactionModel } from 'src/app/models/transaction-model';
import { IncomeSourceModel } from 'src/app/models/income-source.model';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { TransactionsService } from '../../../transactions.service';

@Component({
  selector: 'app-deposit-submit-form',
  templateUrl: './deposit-submit-form.component.html',
  styleUrls: ['./deposit-submit-form.component.css']
})
export class DepositSubmitFormComponent implements OnInit {

  dateModel: Date;
  newDeposit$: Observable<TransactionModel | undefined> = of(undefined);
  @Input() incomeSources: IncomeSourceModel[];
  @Input() savingsAccounts: SavingsAccountModel[];
  errorMessage: string | undefined = undefined;

  constructor(
    private transactionsService: TransactionsService,
    ) { }

  ngOnInit(): void {
  }

  onClearErrorMessage(): void {
    this.errorMessage = undefined;
  }

  onClearNewlySubmittedDeposit(): void {
    this.newDeposit$ = of(undefined);
  }

  onSubmitDeposit(form: NgForm) {
    this.onClearErrorMessage();
    this.onClearNewlySubmittedDeposit();
    if (form.invalid) {
      console.log('form error')
      this.errorMessage = "The form values were not properly filled in!"
      return;
    }
    const data: DepositCreateModel = {
      date: `${form.value.date.year}-${form.value.date.month}-${form.value.date.day}`,
      amount: form.value.amount,
      savings_account: +form.value.savings_account,
      income_source: +form.value.income_source,
    };
    console.log('this is the data to be sent to backend:')
    console.log(data);
    this.newDeposit$ = this.transactionsService.submitNewDeposit(data).pipe(
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
