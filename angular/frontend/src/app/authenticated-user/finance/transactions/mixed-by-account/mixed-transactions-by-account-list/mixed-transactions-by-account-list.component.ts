import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { single } from 'rxjs/operators';
import {
  getYearsOptions, monthsAndIntegers
} from 'src/app/shared-utils/date-helpers.util';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import {
  TransactionModel
} from 'src/app/models/transaction-model';
import { TransactionsService } from '../../transactions.service';
@Component({
  selector: 'app-mixed-transactions-by-account-list',
  templateUrl: './mixed-transactions-by-account-list.component.html',
  styleUrls: ['./mixed-transactions-by-account-list.component.css']
})
export class MixedTransactionsByAccountListComponent implements OnInit {

  @Input() savingsAccounts: SavingsAccountModel[];
  years: Number[];
  selectedAccountId: number;
  selectedMonth: [string, number] = ['January', 1];
  selectedYear: string = '';
  showAccountandMonthSelectForm: boolean = true;
  monthlyTransactions: TransactionModel[];
  monthsAndIntegers: [string, number][];
  

  constructor(
    private transactionsService: TransactionsService
    ) { }

  ngOnInit(): void {
    this.years = getYearsOptions();
    this.monthsAndIntegers = monthsAndIntegers;
  }

  calculateTotalDeposits(monthlyTransactions: TransactionModel[]) {
    let value = 0;
    for (var i = 0; i < monthlyTransactions.length; i++) {
      if (monthlyTransactions[i].transaction === 'Deposit') {
        value += +monthlyTransactions[i].amount
      }
    }
    return this.formatThousand(value);
  }


  calculateTotalWithdrawals(monthlyTransactions: TransactionModel[]) {
    let value = 0;
    for (var i = 0; i < monthlyTransactions.length; i++) {
      if (monthlyTransactions[i].transaction === 'Withdrawal') {
        value += +monthlyTransactions[i].amount
      }
    }
    return this.formatThousand(value);
  }

  formatThousand(value: number) {
    if (!value) return ''
    let strValue = value.toString()
    return strValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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
    let accountId = form.value.accountId;
    this.selectedAccountId = form.value.accountId;
    this.selectedYear = form.value.year;
    this.selectedMonth = monthsAndIntegers[+month - 1]
    this.transactionsService
          .fetchAccountTransactionsByMonthAndYear(
              month, year, accountId).pipe(single()
            ).subscribe(res => { this.monthlyTransactions = res; }
          );
    this.showAccountandMonthSelectForm = false;
  }

  showAccountAndMonthSelect() {
    this.showAccountandMonthSelectForm = true;
  }

}
