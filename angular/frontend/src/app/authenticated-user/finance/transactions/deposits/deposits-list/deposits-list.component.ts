import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Observable } from 'rxjs';
import { 
  getYearsOptions, monthsAndIntegers 
} from 'src/app/shared-utils/date-helpers.util';

import { TransactionModel } from 'src/app/models/transaction-model';
import { TransactionsService } from '../../transactions.service';

@Component({
  selector: 'app-deposits-list',
  templateUrl: './deposits-list.component.html',
  styleUrls: ['./deposits-list.component.css']
})
export class DepositsListComponent implements OnInit {

  years: Number[];
  selectedMonth: [string, number] = ['January', 1];
  selectedYear: string = '';
  showMonthlySelectForm: boolean = true;
  monthlyDeposits$: Observable<TransactionModel[]>;
  monthsAndIntegers: [string, number][];

  constructor(
    private transactionsService: TransactionsService
    ) { }

  ngOnInit(): void {
    this.years = getYearsOptions();
    this.monthsAndIntegers = monthsAndIntegers;
  }

  calculateTotalDeposits(monthlyDeposits: TransactionModel[]) {
    let value = 0;
    for (var i = 0; i < monthlyDeposits.length; i++) {
      value += +monthlyDeposits[i].amount
    }
    return this.formatThousand(value);
  }

  formatThousand(value: number) {
    if (!value) return ''
    let strValue = value.toString()
    return strValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  onMonthYearSelect(form: NgForm) {
    console.log('submit value to navigate now ...')
    console.log(form.value);
    if (form.invalid) {
      console.log('calandar sumit form is invalid')
      console.log(form.errors);
      return;
    }
    console.log('valid!')
    let year = form.value.year;
    let month = form.value.month;
    this.selectedYear = form.value.year;
    this.selectedMonth = monthsAndIntegers[+month - 1]
    this.monthlyDeposits$ = this.transactionsService
                                  .fetchDepositsByMonthAndYear(
                                    month, year
                                  );

    this.showMonthlySelectForm = false;
  }


  showMonthlySelect() {
    this.showMonthlySelectForm = true;
  }

}
