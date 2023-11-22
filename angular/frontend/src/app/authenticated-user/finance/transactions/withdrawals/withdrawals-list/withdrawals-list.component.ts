import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { single } from 'rxjs/operators';
import {
  getYearsOptions, monthsAndIntegers
} from 'src/app/shared-utils/date-helpers.util';
import {
  TransactionModel, TransactionDeletionResponse
} from 'src/app/models/transaction-model';
import { TransactionsService } from '../../transactions.service';

@Component({
  selector: 'app-withdrawals-list',
  templateUrl: './withdrawals-list.component.html',
  styleUrls: ['./withdrawals-list.component.css']
})
export class WithdrawalsListComponent implements OnInit {

  years: Number[];
  selectedMonth: [string, number] = ['January', 1];
  selectedYear: string = '';
  showMonthlySelectForm: boolean = true;
  withdrawalDeletionResponse: TransactionDeletionResponse | undefined = undefined;
  monthlyWithdrawals: TransactionModel[];
  monthsAndIntegers: [string, number][];

  constructor(
    private transactionsService: TransactionsService
    ) { }

  ngOnInit(): void {
    this.years = getYearsOptions();
    this.monthsAndIntegers = monthsAndIntegers;
  }

  calculateTotalWithdrawals(monthlyWithdrawals: TransactionModel[]) {
    let value = 0;
    for (var i = 0; i < monthlyWithdrawals.length; i++) {
      value += +monthlyWithdrawals[i].amount
    }
    return this.formatThousand(value);
  }

  formatThousand(value: number) {
    if (!value) return ''
    let strValue = value.toString()
    return strValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  onClearDeletionMessage() {
    this.withdrawalDeletionResponse = undefined;
  }

  onDeleteWithdrawal(id: number) {
    this.transactionsService
      .deleteWithdrawal(
          id).pipe(single()
        ).subscribe(res => {
          console.log('catching the response')
          console.log(res);
          this.withdrawalDeletionResponse = res;
          this.monthlyWithdrawals = this.transactionsService
              .removeTransactionFromArrayById(
                this.monthlyWithdrawals, id)
              ;
        }
      );
  }

  onMonthYearSelect(form: NgForm) {
    if (form.invalid) {
      console.log('submit form is invalid')
      console.log(form.errors);
      return;
    }
    console.log('valid!')
    let year = form.value.year;
    let month = form.value.month;
    this.selectedYear = form.value.year;
    this.selectedMonth = monthsAndIntegers[+month - 1]
    this.transactionsService
          .fetchWithdrawalsByMonthAndYear(
              month, year).pipe(single()
            ).subscribe(res => { this.monthlyWithdrawals = res; }
          );
    this.showMonthlySelectForm = false;
  }

  showMonthlySelect() {
    this.showMonthlySelectForm = true;
  }



}
